/* eslint-disable camelcase */
import { getRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import Profile from '@modules/profiles/infra/typeorm/entities/Profile';

interface Request {
  user_id: string;
  login: string;
  bio: string;
}

class UpdateProfileService {
  public async execute({ user_id, login, bio }: Request): Promise<Profile> {
    const profilesRepository = getRepository(Profile);

    const profile = await profilesRepository.findOne({
      where: { user_id },
    });

    if (!profile) {
      throw new AppError('Profile does not exist');
    }

    if (login) {
      const loginExists = await profilesRepository.findOne({
        where: { login },
      });

      if (loginExists) {
        throw new AppError('Login already used');
      }
    }

    if (login) profile.login = login;
    if (bio) profile.bio = bio;

    await profilesRepository.save(profile);

    return profile;
  }
}

export default UpdateProfileService;
