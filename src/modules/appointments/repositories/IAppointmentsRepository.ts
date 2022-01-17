import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IListProfileAppointmentsDTO from '../dtos/IListProfileAppointmentsDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByParams(
    data: IListProfileAppointmentsDTO,
  ): Promise<Appointment[] | undefined>;
  findByAgendaIds(agendaIds: string[]): Promise<Appointment[]>;
}
