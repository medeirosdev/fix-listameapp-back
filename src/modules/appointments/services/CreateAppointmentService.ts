import { parseISO } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    agendaId,
    startDate,
    endDate,
    appointmentName,
    appointmentDescription,
    notifyBefore,
    recurrence,
    status,
    location,
    isPrivate,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    console.log("1")
    const parsedStartDate = parseISO(String(startDate));
    const parsedEndDate = endDate ? parseISO(String(endDate)) : null;
    console.log("2")
    const data = {
      agendaId,
      startDate: parsedStartDate,
      endDate,
      appointmentName,
      appointmentDescription,
      notifyBefore,
      recurrence,
      status,
      location,
      isPrivate,
    };

    if (parsedEndDate) {
      data.endDate = parsedEndDate;
    }
    console.log("3")
    const appointment = await this.appointmentsRepository.create(data);
    console.log(data);
    return appointment;
  }
}

export default CreateAppointmentService;
