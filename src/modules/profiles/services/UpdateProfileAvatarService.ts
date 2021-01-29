/* eslint-disable camelcase */
import path from 'path';
import fs from 'fs';
import { getRepository } from 'typeorm';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import Profile from '@modules/profiles/infra/typeorm/entities/Profile';

interface Request {
  user_id: string;
  avatarFileName: string;
}

class UpdateProfileAvatarService {
  public async execute({ user_id, avatarFileName }: Request): Promise<Profile> {
    const profilesRepository = getRepository(Profile);

    const profile = await profilesRepository.findOne({
      where: { user_id },
    });

    if (!profile) {
      throw new AppError('Profile does not exist');
    }

    if (profile.avatar) {
      const profileAvatarFilePath = path.join(
        uploadConfig.directory,
        profile.avatar,
      );

      const profileAvatarFileExists = await fs.promises.stat(
        profileAvatarFilePath,
      );

      if (profileAvatarFileExists) {
        await fs.promises.unlink(profileAvatarFilePath);
      }
    }

    profile.avatar = avatarFileName;

    await profilesRepository.save(profile);

    return profile;
  }
}

export default UpdateProfileAvatarService;
