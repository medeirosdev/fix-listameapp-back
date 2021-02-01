// import { format, parseISO } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface Request {
  userId: string;
  groupId: string;
  startDate: Date;
  endDate: Date;
  appointmentName: string;
  appointmentDescription: string;
  location: string;
  isPrivate: boolean;
}

@injectable()
class CreateAppointmentService {
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
    location,
    isPrivate,
  }: Request): Promise<Appointment> {
    // const appointmentDate = startOfHour(startDate);

    // const hasAppointmentInSameDate = appointmentsRepository.findByDate(
    //   appointmentDate,
    // );

    // if (hasAppointmentInSameDate) {
    //   throw Error('This appointment is already booked');
    // }

    const appointment = await this.appointmentsRepository.create({
      userId,
      groupId,
      startDate,
      endDate,
      appointmentName,
      appointmentDescription,
      location,
      isPrivate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
