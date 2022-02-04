// import { format, parseISO } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IUsersAgendasRepository from '@modules/agendas/repositories/IUsersAgendasRepository';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import IListProfileAppointmentsDTO from '../dtos/IListProfileAppointmentsDTO';

@injectable()
class ListProfileAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('UsersAgendasRepository')
    private usersAgendasRepository: IUsersAgendasRepository,
  ) {}

  public async execute({
    userId,
    agendaId,
    startDate,
    endDate,
    appointmentName,
    appointmentDescription,
    status,
    location,
    isPrivate,
  }: IListProfileAppointmentsDTO): Promise<Appointment[]> {
    const userAgenda = await this.usersAgendasRepository.findByUserId(userId);

    if (!userAgenda) {
      throw new AppError('Appointment not found');
    }

    const agendaIds: string[] = userAgenda.map(item => item.agenda_id);

    if (agendaId && !agendaIds.includes(agendaId)) {
      throw new AppError('Appointment not found');
    }

    const appointment = await this.appointmentsRepository.findByParams({
      agendaIds: agendaId ? [agendaId] : agendaIds,
      startDate,
      endDate,
      appointmentName,
      appointmentDescription,
      status,
      location,
      isPrivate,
    });

    return appointment;
  }
}

export default ListProfileAppointmentsService;
