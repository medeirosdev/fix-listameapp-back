import { getRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import Profile from '@modules/profiles/infra/typeorm/entities/Profile';

interface Request {
  userId: string;
}

class CreateProfileService {
  public async execute({ userId }: Request): Promise<Profile> {
    const profilesRepository = getRepository(Profile);

    const profileExists = await profilesRepository.findOne({
      where: { user_id: { userId } },
    });

    if (profileExists) {
      throw new AppError('User profile already exists');
    }

    const profile = profilesRepository.create({
      user_id: userId,
    });

    await profilesRepository.save(profile);

    return profile;
  }
}

export default CreateProfileService;
