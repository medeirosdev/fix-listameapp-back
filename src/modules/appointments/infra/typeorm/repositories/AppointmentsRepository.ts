/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
import {
  getRepository,
  Repository,
  MoreThanOrEqual,
  In,
  getConnection,
  DeleteResult,
} from 'typeorm';
import { addDays } from 'date-fns';
import { uuid } from 'uuidv4';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IListProfileAppointmentsDTO from '@modules/appointments/dtos/IListProfileAppointmentsDTO';
import IDeleteProfileAppointmentsRequestDTO from '@modules/appointments/dtos/IDeleteProfileAppointmentsRequestDTO';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import { reccurrenceTypes } from '@modules/appointments/utils/enums';

interface DataToDelete {
  agendaIds: string[];
  appointmentId: string;
  reccurrenceId?: string;
}

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByParams({
    agendaIds,
    startDate,
    endDate,
    appointmentName,
    appointmentDescription,
    reccurrentId,
    status,
    location,
    isPrivate,
  }: IListProfileAppointmentsDTO): Promise<Appointment[] | undefined> {
    const where = {} as any;

    if (startDate) where.start_date = startDate;
    if (endDate) where.end_date = endDate;
    if (appointmentName) where.appointment_name = appointmentName;
    if (appointmentDescription)
      where.appointment_description = appointmentDescription;
    if (status) where.status = status;
    if (location) where.location = location;
    if (isPrivate) where.is_private = isPrivate;
    if (agendaIds) where.agenda_id = In(agendaIds);
    if (reccurrentId) where.reccurrent_id = reccurrentId;

    const hasAppointment = await this.ormRepository.find({
      where,
    });

    return hasAppointment;
  }

  public async findByAgendaIds(agendaIds: string[]): Promise<Appointment[]> {
    const hasAppointments = await this.ormRepository.find({
      agenda_id: In(agendaIds),
      start_date: MoreThanOrEqual(new Date()),
    });

    return hasAppointments;
  }

  public async findById(agendaIds: string[], id: string): Promise<Appointment> {
    const appointment = await this.ormRepository.findOne({
      agenda_id: In(agendaIds),
      id,
    });

    if (!appointment) {
      throw new Error('Appointment not found');
    }

    return appointment;
  }

  public async delete(data: DataToDelete): Promise<DeleteResult> {
    const where = {
      agenda_id: In(data.agendaIds),
    };

    if (data.reccurrenceId) {
      where.reccurent_id = data.reccurrenceId;
    } else {
      where.id = data.appointmentId;
    }

    const appointments = await this.ormRepository.delete(where);

    return appointments;
  }

  public async create({
    agendaId,
    startDate,
    endDate,
    appointmentName,
    appointmentDescription,
    notifyBefore,
    reccurence,
    status,
    location,
    isPrivate,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    if (reccurence) {
      const appointments = [];
      const reccurent_id = await uuid();

      const getReccurrence = reccurrenceType => {
        for (let i = 0; i < reccurrenceType.timesToRepeat; i++) {
          appointments.push({
            agenda_id: agendaId,
            start_date: addDays(startDate, i * reccurrenceType.repeatEvery),
            end_date: endDate
              ? addDays(endDate, i * reccurrenceType.repeatEvery)
              : null,
            appointment_name: appointmentName,
            appointment_description: appointmentDescription || null,
            notify_before: notifyBefore || null,
            reccurent_id,
            status,
            location: location || null,
            is_private: isPrivate,
          });
        }
      };
      switch (reccurence) {
        case 'DAILY':
          getReccurrence(reccurrenceTypes.DAILY);
          break;
        case 'WEEKLY':
          getReccurrence(reccurrenceTypes.WEEKLY);
          break;
        case 'MONTHLY':
          getReccurrence(reccurrenceTypes.MONTHLY);
          break;
        default:
          break;
      }
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Appointment)
        .values(appointments)
        .execute();

      return appointments;
    }

    const appointment = this.ormRepository.create({
      agenda_id: agendaId,
      start_date: startDate,
      end_date: endDate || null,
      appointment_name: appointmentName,
      appointment_description: appointmentDescription || null,
      notify_before: notifyBefore || null,
      reccurent_id: null,
      status,
      location: location || null,
      is_private: isPrivate,
    });

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async save(appointment: Appointment): Promise<Appointment> {
    return this.ormRepository.save(appointment);
  }
}

export default AppointmentsRepository;
