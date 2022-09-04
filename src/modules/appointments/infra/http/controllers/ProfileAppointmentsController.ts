import { Request, Response } from 'express';
import { isSameDay } from 'date-fns';
import { container } from 'tsyringe';
import { DeleteResult } from 'typeorm';

import ListProfileAppointmentsService from '@modules/appointments/services/ListProfileAppointmentsService';
import UpdateProfileAppointmentsService from '@modules/appointments/services/UpdateProfileAppointmentsService';
import DeleteProfileAppointmentsService from '@modules/appointments/services/DeleteProfileAppointmentsService';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IListProfileAppointmentsDTO from '@modules/appointments/dtos/IListProfileAppointmentsDTO';
import IDeleteProfileAppointmentsRequestDTO from '@modules/appointments/dtos/IDeleteProfileAppointmentsRequestDTO';

interface GroupedAppointment {
  date: string | Date;
  appointments: Appointment[];
}

const groupByDate = (appointments: Appointment[]) => {
  const response: GroupedAppointment[] = [];
  appointments.forEach(appointment => {
    // const date = format(appointment.start_date, 'dd/MM/yyyy');
    if (response.length === 0) {
      response.push({
        date: appointment.start_date,
        appointments: [appointment],
      });
    } else {
      const ind = response.findIndex(item => {
        return isSameDay(new Date(item.date), new Date(appointment.start_date));
      });
      if (ind < 0) {
        response.push({
          date: appointment.start_date,
          appointments: [appointment],
        });
      } else {
        response[ind].appointments.push(appointment);
      }
    }
  });
  return response.sort((a, b) => {
    if (a.date < b.date) return -1;
    if (a.date > b.date) return 1;
    return 0;
  });
};

export default class ProfileAppointmentsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;
    const {
      agendaIds,
      startDate,
      endDate,
      appointmentName,
      appointmentDescription,
      status,
      location,
      isPrivate,
    } = req.query;

    const data = {
      userId,
      agendaIds,
      startDate,
      endDate,
      appointmentName,
      appointmentDescription,
      status,
      location,
      isPrivate,
    } as IListProfileAppointmentsDTO;

    const listProfileAppointmentsService = container.resolve(
      ListProfileAppointmentsService,
    );

    const appointments: Appointment[] = await listProfileAppointmentsService.execute(
      data,
    );

    return res.json(groupByDate(appointments));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;
    const { id } = req.params;
    const {
      startDate,
      endDate,
      appointmentName,
      appointmentDescription,
      status,
      location,
      notifyBefore,
      isPrivate,
    } = req.body;

    const data = {
      userId,
      id,
      startDate,
      endDate,
      appointmentName,
      appointmentDescription,
      status,
      location,
      isPrivate,
      notifyBefore,
    } as IListProfileAppointmentsDTO;

    const updateProfileAppointmentsService = container.resolve(
      UpdateProfileAppointmentsService,
    );

    const appointment: Appointment = await updateProfileAppointmentsService.execute(
      data,
    );

    return res.json(appointment);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;
    const { appointmentId, reccurrenceId } = req.body;

    console.log('userId from body', userId);
    console.log('appointmentId from body', appointmentId);
    console.log('reccurrenceId from body', reccurrenceId);

    const data = {
      userId,
      appointmentId,
      reccurrenceId,
    } as IDeleteProfileAppointmentsRequestDTO;

    const deleteProfileAppointmentsService = container.resolve(
      DeleteProfileAppointmentsService,
    );

    const result: DeleteResult = await deleteProfileAppointmentsService.execute(
      data,
    );

    return res.json(result);
  }
}
