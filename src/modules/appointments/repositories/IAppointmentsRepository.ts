import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IListProfileAppointmentsDTO from '../dtos/IListProfileAppointmentsDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findByUserId(
    data: IListProfileAppointmentsDTO,
  ): Promise<Appointment[] | undefined>;
}
