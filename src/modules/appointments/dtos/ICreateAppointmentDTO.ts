export default interface ICreateAppointmentDTO {
  agendaId: string;
  startDate: Date;
  endDate?: Date;
  appointmentName: string;
  appointmentDescription?: string;
  notifyBefore?: number;
  reccurence?: string;
  status: string;
  location?: string;
  isPrivate: boolean;
}
