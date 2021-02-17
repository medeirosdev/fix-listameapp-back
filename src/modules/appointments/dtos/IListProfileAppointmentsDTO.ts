export default interface IListProfileAppointmentsDTO {
  userId: string;
  groupId: string;
  startDate: Date;
  endDate: Date;
  appointmentName: string;
  appointmentDescription: string;
  status: string;
  location: string;
  isPrivate: boolean;
}
