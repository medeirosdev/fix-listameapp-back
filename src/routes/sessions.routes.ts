import { Router } from 'express';

import CreateSessionService from '../services/CreateSessionService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const userSession = new CreateSessionService();

  const { user, token } = await userSession.execute({
    email,
    password,
  });

  // @ts-expect-error Aqui vai ocorrer um erro, mas estou ignorando
  delete user.password;

  return res.json({ user, token });
});

export default sessionsRouter;
