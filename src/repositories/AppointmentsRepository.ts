import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

interface CreateAppointmentDTO {
  userId: string;
  startDate: Date;
  endDate: Date;
  appointmentName: string;
  appointmentDescription: string;
  location: string;
}

class AppointmentRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public create({
    userId,
    startDate,
    endDate,
    appointmentName,
    appointmentDescription,
    location,
  }: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({
      userId,
      startDate,
      endDate,
      appointmentName,
      appointmentDescription,
      location,
    });

    this.appointments.push(appointment);

    return appointment;
  }

  public all(): Appointment[] {
    return this.appointments;
  }

  public findByDate(date: Date): Appointment | null {
    const hasAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.startDate),
    );

    return hasAppointment || null;
  }
}

export default AppointmentRepository;
