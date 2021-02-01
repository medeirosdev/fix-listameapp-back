import { hash } from 'bcryptjs';
import { injectable, inject, container } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import CreateProfileService from '@modules/profiles/services/CreateProfileService';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  name: string;
  surname: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    name,
    surname,
    email,
    password,
  }: Request): Promise<User> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('Email address already used');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      surname,
      email,
      password: hashedPassword,
      status: 'ACTIVE',
      type: 'DEFAULT',
    });

    await this.usersRepository.save(user);

    const createProfile = container.resolve(CreateProfileService);

    await createProfile.execute({
      userId: user.id,
    });

    return user;
  }
}

export default CreateUserService;
