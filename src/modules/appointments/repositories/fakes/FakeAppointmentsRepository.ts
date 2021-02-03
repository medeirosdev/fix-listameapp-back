// import { uuid } from 'uuidv4';

// import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
// import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
// import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

// class AppointmentsRepository implements IAppointmentsRepository {
//   private appointments: Appointment[] = [];

//   public async findByDate(date: Date): Promise<Appointment | undefined> {}

//   public async create({
//     userId,
//     groupId,
//     startDate,
//     endDate,
//     appointmentName,
//     appointmentDescription,
//     location,
//     isPrivate,
//   }: ICreateAppointmentDTO): Promise<Appointment> {
//     const appointment = new Appointment();

//     appointment.id = uuid();
//   }
// }

// export default AppointmentsRepository;
