import { EntityRepository, Repository } from 'typeorm';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

@EntityRepository(Appointment)
class AppointmentRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    const hasAppointment = await this.findOne({
      where: { startDate: date },
    });

    return hasAppointment || null;
  }
}

export default AppointmentRepository;