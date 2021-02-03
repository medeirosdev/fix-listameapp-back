/* eslint-disable camelcase */
import path from 'path';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import Profile from '@modules/profiles/infra/typeorm/entities/Profile';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IProfilesRepository from '../repositories/IProfilesRepository';

interface Request {
  user_id: string;
  avatarFileName: string;
}

@injectable()
class UpdateProfileAvatarService {
  constructor(
    @inject('ProfilesRepository')
    private profilesRepository: IProfilesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, avatarFileName }: Request): Promise<Profile> {
    const profile = await this.profilesRepository.findByUserId(user_id);

    if (!profile) {
      throw new AppError('Profile does not exist');
    }

    if (profile.avatar) {
      await this.storageProvider.deleteFile(profile.avatar);
    }

    const fileName = await this.storageProvider.saveFile(avatarFileName);

    profile.avatar = fileName;

    await this.profilesRepository.save(profile);

    return profile;
  }
}

export default UpdateProfileAvatarService;
