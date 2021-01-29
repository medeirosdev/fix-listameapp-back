import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';
import User from '../models/User';
import CreateProfileService from './CreateProfileService';

interface Request {
  name: string;
  surname: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({
    name,
    surname,
    email,
    password,
  }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const userExists = await usersRepository.findOne({
      where: { email },
    });

    if (userExists) {
      throw new AppError('Email address already used');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      surname,
      email,
      password: hashedPassword,
      status: 'ACTIVE',
      type: 'DEFAULT',
    });

    await usersRepository.save(user);

    const createProfile = new CreateProfileService();

    await createProfile.execute({
      userId: user.id,
    });

    return user;
  }
}

export default CreateUserService;
