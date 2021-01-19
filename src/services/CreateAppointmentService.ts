// import { startOfHour, parseISO, isEqual } from 'date-fns';

import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentsRepository';

interface Request {
  userId: string;
  startDate: Date;
  endDate: Date;
  appointmentName: string;
  appointmentDescription: string;
  location: string;
}

class CreateAppointmentService {
  private appointmentsRepository: AppointmentRepository;

  constructor(appointmentsRepository: AppointmentRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({
    userId,
    startDate,
    endDate,
    appointmentName,
    appointmentDescription,
    location,
  }: Request): Appointment {
    // const appointmentDate = startOfHour(startDate);

    // const hasAppointmentInSameDate = this.appointmentsRepository.findByDate(
    //   appointmentDate,
    // );

    // if (hasAppointmentInSameDate) {
    //   throw Error('This appointment is already booked');
    // }

    const appointment = this.appointmentsRepository.create({
      userId,
      startDate,
      endDate,
      appointmentName,
      appointmentDescription,
      location,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
