import Profile from '../infra/typeorm/entities/Profile';
import ICreateProfileDTO from '../dtos/ICreateProfileDTO';

export default interface IProfilesRepository {
  findByUserId(userId: string): Promise<Profile | undefined>;
  findByLogin(login: string): Promise<Profile | undefined>;
  create(profileData: ICreateProfileDTO): Promise<Profile>;
  save(profile: Profile): Promise<Profile>;
}
