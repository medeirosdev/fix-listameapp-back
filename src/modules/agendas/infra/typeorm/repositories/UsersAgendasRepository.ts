import { getRepository, Repository } from 'typeorm';

import IUsersAgendasRepository from '@modules/agendas/repositories/IUsersAgendasRepository';
import ICreateUserAgendaDTO from '@modules/agendas/dtos/ICreateUserAgendaDTO';
import UserAgenda from '@modules/agendas/infra/typeorm/entities/UserAgenda';

class UsersAgendasRepository implements IUsersAgendasRepository {
  private ormRepository: Repository<UserAgenda>;

  constructor() {
    this.ormRepository = getRepository(UserAgenda);
  }

  public async findById(id: string): Promise<UserAgenda | undefined> {
    const agenda = await this.ormRepository.findOne(id);

    return agenda;
  }

  public async findByUserId(id: string): Promise<UserAgenda[] | undefined> {
    const agenda = await this.ormRepository.find({
      where: {
        user_id: id,
      },
    });

    return agenda;
  }

  public async findByAgendaId(id: string): Promise<UserAgenda[] | undefined> {
    const agenda = await this.ormRepository.find({
      where: {
        agenda_id: id,
      },
    });

    return agenda;
  }

  public async create({
    userId,
    agendaId,
  }: ICreateUserAgendaDTO): Promise<UserAgenda> {
    const userAgenda = this.ormRepository.create({
      user_id: userId,
      agenda_id: agendaId,
    });

    await this.ormRepository.save(userAgenda);

    return userAgenda;
  }

  public async save(userAgenda: UserAgenda): Promise<UserAgenda> {
    return this.ormRepository.save(userAgenda);
  }
}

export default UsersAgendasRepository;
