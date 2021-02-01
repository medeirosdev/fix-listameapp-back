import { getRepository, Repository } from 'typeorm';

import IProfilesRepository from '@modules/profiles/repositories/IProfilesRepository';
import Profile from '@modules/profiles/infra/typeorm/entities/Profile';
import ICreateProfileDTO from '@modules/profiles/dtos/ICreateProfileDTO';

class ProfilesRepository implements IProfilesRepository {
  private ormRepository: Repository<Profile>;

  constructor() {
    this.ormRepository = getRepository(Profile);
  }

  public async findByUserId(userId: string): Promise<Profile | undefined> {
    const user = await this.ormRepository.findOne({ where: { userId } });

    return user;
  }

  public async findByLogin(login: string): Promise<Profile | undefined> {
    const user = await this.ormRepository.findOne({
      where: { login },
    });

    return user;
  }

  public async create({ userId }: ICreateProfileDTO): Promise<Profile> {
    const profile = this.ormRepository.create({ user_id: userId });

    await this.ormRepository.save(profile);

    return profile;
  }

  public async save(profile: Profile): Promise<Profile> {
    return this.ormRepository.save(profile);
  }
}

export default ProfilesRepository;
