import { Request, Response } from 'express';
import {
  parseISO,
  isSameDay,
  format,
  isEqual,
  isToday,
  isYesterday,
  isTomorrow,
} from 'date-fns';
import { container } from 'tsyringe';

import ListProfileAppointmentsService from '@modules/appointments/services/ListProfileAppointmentsService';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

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
      groupId,
      startDate,
      endDate,
      appointmentName,
      appointmentDescription,
      status,
      location,
      isPrivate,
    } = req.query;

    const listProfileAppointmentsService = container.resolve(
      ListProfileAppointmentsService,
    );

    const parsedStartDate = startDate ? parseISO(startDate) : undefined;
    const parsedEndDate = endDate ? parseISO(endDate) : undefined;

    const appointments: Appointment[] = await listProfileAppointmentsService.execute(
      {
        userId,
        groupId,
        startDate: parsedStartDate,
        endDate: parsedEndDate,
        appointmentName,
        appointmentDescription,
        status,
        location,
        isPrivate: isPrivate === 'true',
      },
    );

    return res.json(groupByDate(appointments));
  }
}
