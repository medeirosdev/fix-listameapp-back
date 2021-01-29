import { Router } from 'express';

import CreateSessionService from '@modules/users/services/CreateSessionService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const userSession = new CreateSessionService();

  const { user, token } = await userSession.execute({
    email,
    password,
  });

  delete user.password;

  return res.json({ user, token });
});

export default sessionsRouter;
