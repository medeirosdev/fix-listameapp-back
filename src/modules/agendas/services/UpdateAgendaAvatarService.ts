/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Agenda from '@modules/agendas/infra/typeorm/entities/Agenda';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IAgendasRepository from '../repositories/IAgendasRepository';

interface Request {
  id: string;
  avatarFileName: string;
}

@injectable()
class UpdateAgendaAvatarService {
  constructor(
    @inject('AgendasRepository')
    private agendasRepository: IAgendasRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ id, avatarFileName }: Request): Promise<Agenda> {
    const agenda = await this.agendasRepository.findById(id);

    if (!agenda) {
      throw new AppError('Agenda does not exist');
    }

    if (agenda.avatar) {
      await this.storageProvider.deleteFile(agenda.avatar);
    }

    const fileName = await this.storageProvider.saveFile(avatarFileName);

    agenda.avatar = fileName;

    await this.agendasRepository.save(agenda);

    return agenda;
  }
}

export default UpdateAgendaAvatarService;
