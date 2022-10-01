import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ShowAppointmentService from '@modules/appointments/services/ShowAppointmentService';
import { groupByDate } from '@modules/appointments/utils/groupByDate';

export default class AppointmentsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute(req.body);

    return res.json(appointment);
  }

  public async listByAgenda(req: Request, res: Response): Promise<Response> {
    const { agendaId } = req.params;

    const showAppointment = container.resolve(ShowAppointmentService);

    const appointments = await showAppointment.execute(agendaId);

    return res.json(groupByDate(appointments));
  }
}
