// import { format, parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppointmentRepository from '@modules/appointments/repositories/AppointmentsRepository';

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

class CreateAppointmentService {
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

    const appointmentsRepository = getCustomRepository(AppointmentRepository);

    const appointment = appointmentsRepository.create({
      user_id: userId,
      group_id: groupId,
      start_date: startDate,
      end_date: endDate,
      appointment_name: appointmentName,
      appointment_description: appointmentDescription,
      location,
      is_private: isPrivate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
