/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Profile from '@modules/profiles/infra/typeorm/entities/Profile';
import IProfilesRepository from '../repositories/IProfilesRepository';

interface Request {
  user_id: string;
  login: string;
  bio: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('ProfilesRepository')
    private profilesRepository: IProfilesRepository,
  ) {}

  public async execute({ user_id, login, bio }: Request): Promise<Profile> {
    const profile = await this.profilesRepository.findByUserId(user_id);

    if (!profile) {
      throw new AppError('Profile does not exist');
    }

    if (login) {
      const loginExists = await this.profilesRepository.findByLogin(login);

      if (loginExists) {
        throw new AppError('Login already used');
      }
    }

    if (login) profile.login = login;
    if (bio) profile.bio = bio;

    await this.profilesRepository.save(profile);

    return profile;
  }
}

export default UpdateProfileService;
