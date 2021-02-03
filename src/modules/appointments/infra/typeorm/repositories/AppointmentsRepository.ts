import { getRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const hasAppointment = await this.ormRepository.findOne({
      where: { startDate: date },
    });

    return hasAppointment;
  }

  public async create({
    userId,
    groupId,
    startDate,
    endDate,
    appointmentName,
    appointmentDescription,
    status,
    location,
    isPrivate,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      user_id: userId,
      group_id: groupId,
      start_date: startDate,
      end_date: endDate,
      appointment_name: appointmentName,
      appointment_description: appointmentDescription,
      status,
      location,
      is_private: isPrivate,
    });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
