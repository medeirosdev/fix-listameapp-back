import { uuid } from 'uuidv4';
import { Entity } from 'typeorm';

class Appointment {
  id: string;

  userId: string;

  startDate: Date;

  endDate: Date;

  appointmentName: string;

  appointmentDescription: string;

  location: string;

  constructor({
    userId,
    startDate,
    endDate,
    appointmentName,
    appointmentDescription,
    location,
  }: Omit<Appointment, 'id'>) {
    this.id = uuid();
    this.userId = userId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.appointmentName = appointmentName;
    this.appointmentDescription = appointmentDescription;
    this.location = location;
  }
}

export default Appointment;
