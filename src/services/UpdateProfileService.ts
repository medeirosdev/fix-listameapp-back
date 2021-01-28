/* eslint-disable camelcase */
import { getRepository } from 'typeorm';

import Profile from '../models/Profile';

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
      throw new Error('Profile does not exist');
    }

    if (login) {
      const loginExists = await profilesRepository.findOne({
        where: { login },
      });

      if (loginExists) {
        throw new Error('Login already used');
      }
    }

    if (login) profile.login = login;
    if (bio) profile.bio = bio;

    await profilesRepository.save(profile);

    return profile;
  }
}

export default UpdateProfileService;
