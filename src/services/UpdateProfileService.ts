import { getRepository } from 'typeorm';

import Profile from '../models/Profile';

interface Request {
  id: string;
  login: string;
  avatar: string;
  bio: string;
}

class UpdateProfileService {
  public async execute({ id, login, bio, avatar }: Request): Promise<Profile> {
    const profilesRepository = getRepository(Profile);

    const profile = await profilesRepository.findByIds([id]);

    if (!profile || (Array.isArray(profile) && profile.length === 0)) {
      throw new Error('User does not exist');
    }

    const loginExists = await profilesRepository.findOne({
      where: { login },
    });

    if (loginExists) {
      throw new Error('Login already used');
    }

    return profile[0];
  }
}

export default UpdateProfileService;
