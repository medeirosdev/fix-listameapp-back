import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
  const { name, surname, email, password } = req.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    surname,
    email,
    password,
  });

  // @ts-expect-error Aqui vai ocorrer um erro, mas estou ignorando
  delete user.password;

  return res.json(user);
});

export default usersRouter;
