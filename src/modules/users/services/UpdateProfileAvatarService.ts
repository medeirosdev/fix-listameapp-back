/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  user_id: string;
  avatarFileName: string;
}

@injectable()
class UpdateProfileAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, avatarFileName }: Request): Promise<User> {
    const profile = await this.usersRepository.findById(user_id);

    if (!profile) {
      throw new AppError('User does not exist');
    }

    if (profile.avatar) {
      await this.storageProvider.deleteFile(profile.avatar);
    }

    const fileName = await this.storageProvider.saveFile(avatarFileName);

    profile.avatar = fileName;

    await this.usersRepository.save(profile);

    return profile;
  }
}

export default UpdateProfileAvatarService;
