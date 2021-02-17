// import { format, parseISO } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface Request {
  userId: string;
  groupId: string | undefined;
  startDate: Date | undefined;
  endDate: Date | undefined;
  appointmentName: string | undefined;
  appointmentDescription: string | undefined;
  status: string | undefined;
  location: string | undefined;
  isPrivate: boolean | undefined;
}

@injectable()
class ListProfileAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    userId,
    groupId,
    startDate,
    endDate,
    appointmentName,
    appointmentDescription,
    status,
    location,
    isPrivate,
  }: Request): Promise<Appointment[] | undefined> {
    // const appointmentDate = startOfHour(startDate);

    // const hasAppointmentInSameDate = appointmentsRepository.findByDate(
    //   appointmentDate,
    // );

    // if (hasAppointmentInSameDate) {
    //   throw Error('This appointment is already booked');
    // }

    const appointment = await this.appointmentsRepository.findByUserId({
      userId,
      groupId,
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
