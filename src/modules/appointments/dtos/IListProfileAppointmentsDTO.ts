export default interface IListProfileAppointmentsDTO {
  userId: string;
  agendaId?: string;
  startDate?: Date;
  endDate?: Date;
  appointmentName?: string;
  appointmentDescription?: string;
  status?: string;
  location?: string;
  isPrivate?: boolean;
}
