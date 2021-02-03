import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      groupId,
      startDate,
      endDate,
      appointmentName,
      appointmentDescription,
      status,
      location,
      isPrivate,
    } = req.body;

    const userId = req.user.id;

    const parsedStartDate = parseISO(startDate);
    const parsedEndDate = parseISO(endDate);

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      userId,
      groupId,
      startDate: parsedStartDate,
      endDate: parsedEndDate,
      appointmentName,
      appointmentDescription,
      status,
      location,
      isPrivate,
    });

    return res.json(appointment);
  }
}
