import { Router } from 'express';

import CreateUserService from '@modules/users/services/CreateUserService';

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

  delete user.password;

  return res.json(user);
});

export default usersRouter;
