import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Profile from '@modules/profiles/infra/typeorm/entities/Profile';
import IProfilesRepository from '../repositories/IProfilesRepository';

interface Request {
  userId: string;
}

@injectable()
class CreateProfileService {
  constructor(
    @inject('ProfilesRepository')
    private profilesRepository: IProfilesRepository,
  ) {}

  public async execute({ userId }: Request): Promise<Profile> {
    const profileExists = await this.profilesRepository.findByUserId(userId);

    if (profileExists) {
      throw new AppError('User profile already exists');
    }

    const profile = await this.profilesRepository.create({
      userId,
    });

    await this.profilesRepository.save(profile);

    return profile;
  }
}

export default CreateProfileService;
