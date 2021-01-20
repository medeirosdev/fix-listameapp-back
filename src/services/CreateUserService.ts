import { getRepository } from 'typeorm';
import User from '../models/User';

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
      throw new Error('Email address already used');
    }

    const user = usersRepository.create({
      name,
      surname,
      email,
      password,
      status: 'ACTIVE',
      type: 'DEFAULT',
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
