/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';
import { DeleteResult } from 'typeorm';

import AppError from '@shared/errors/AppError';
import Agenda from '@modules/agendas/infra/typeorm/entities/Agenda';
import IAgendasRepository from '../repositories/IAgendasRepository';

interface Request {
  id: string;
  name?: string;
  description?: string;
  isPrivate?: string;
}

@injectable()
class DeleteAgendaService {
  constructor(
    @inject('AgendasRepository')
    private agendasRepository: IAgendasRepository,
  ) {}

  public async execute(id: string): Promise<DeleteResult> {
    return this.agendasRepository.deleteById(id);
  }
}

export default DeleteAgendaService;
