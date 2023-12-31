/* eslint-disable import/no-unresolved */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ShowAppointmentByAgendaService from '@modules/appointments/services/ShowAppointmentByAgendaService';
import { groupByDate } from '@modules/appointments/utils/groupByDate';

export default class AppointmentsController {
  public async create(req: Request, res: Response): Promise<Response> {
    console.log('A');
    const createAppointment = container.resolve(CreateAppointmentService);
    console.log('b');
    const appointment = await createAppointment.execute(req.body);
    console.log('c');
    return res.status(201).json(appointment);
  }

  public async listByAgenda(req: Request, res: Response): Promise<Response> {
    const { agendaId } = req.params;

    const showAppointment = container.resolve(ShowAppointmentByAgendaService);

    const appointments = await showAppointment.execute(agendaId);

    return res.json(groupByDate(appointments));
  }
}
