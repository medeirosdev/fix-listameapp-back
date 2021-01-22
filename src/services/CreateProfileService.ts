import { getRepository } from 'typeorm';

import Profile from '../models/Profile';

interface Request {
  id: string;
  login: string;
}

class CreateProfileService {
  public async execute({ id, login }: Request): Promise<Profile> {
    const profilesRepository = getRepository(Profile);

    const loginExists = await profilesRepository.findOne({
      where: { login },
    });

    if (loginExists) {
      throw new Error('Login already used');
    }

    const profile = profilesRepository.create({
      user_id: id,
      login,
    });

    await profilesRepository.save(profile);

    return profile;
  }
}

export default CreateProfileService;
