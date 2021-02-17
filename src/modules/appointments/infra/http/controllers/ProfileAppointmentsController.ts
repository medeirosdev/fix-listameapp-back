import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import ListProfileAppointmentsService from '@modules/appointments/services/ListProfileAppointmentsService';

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

    const appointment = await listProfileAppointmentsService.execute({
      userId,
      groupId,
      startDate: parsedStartDate,
      endDate: parsedEndDate,
      appointmentName,
      appointmentDescription,
      status,
      location,
      isPrivate: isPrivate === 'true',
    });

    return res.json(appointment);
  }
}
