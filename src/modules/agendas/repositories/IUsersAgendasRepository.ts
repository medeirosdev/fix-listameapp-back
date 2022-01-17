import UserAgenda from '../infra/typeorm/entities/UserAgenda';
import ICreateUserAgendaDTO from '../dtos/ICreateUserAgendaDTO';

export default interface IUsersAgendasRepository {
  findById(id: string): Promise<UserAgenda | undefined>;
  findByUserId(id: string): Promise<UserAgenda[] | undefined>;
  findByAgendaId(id: string): Promise<UserAgenda[] | undefined>;
  create(data: ICreateUserAgendaDTO): Promise<UserAgenda>;
  save(agenda: UserAgenda): Promise<UserAgenda>;
}
