import { DeleteResult } from 'typeorm';
import Agenda from '../infra/typeorm/entities/Agenda';
import ICreateAgendaDTO from '../dtos/ICreateAgendaDTO';

export default interface IAgendasRepository {
  findByIds(id: string[]): Promise<Agenda[]>;
  deleteById(id: string): Promise<DeleteResult>;
  findAll(params: string): Promise<Agenda[]>;
  findByName(name: string): Promise<Agenda[] | undefined>;
  create(data: ICreateAgendaDTO): Promise<Agenda>;
  save(agenda: Agenda): Promise<Agenda>;
}
