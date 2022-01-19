/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';

import Agenda from '@modules/agendas/infra/typeorm/entities/Agenda';
import IAgendasRepository from '../repositories/IAgendasRepository';

@injectable()
class ShowAgendaService {
  constructor(
    @inject('AgendasRepository')
    private agendasRepository: IAgendasRepository,
  ) {}

  public async execute(id: string): Promise<Agenda[]> {
    const agendas = await this.agendasRepository.findAll(id);

    return agendas;
  }
}

export default ShowAgendaService;
