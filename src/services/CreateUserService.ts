import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';
import CreateProfileService from './CreateProfileService';

interface Request {
  name: string;
  surname: string;
  email: string;
  login: string;
  password: string;
}

class CreateUserService {
  public async execute({
    name,
    surname,
    email,
    password,
    login,
  }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const userExists = await usersRepository.findOne({
      where: { email },
    });

    if (userExists) {
      throw new Error('Email address already used');
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
      id: user.id,
      login,
    });

    return user;
  }
}

export default CreateUserService;
