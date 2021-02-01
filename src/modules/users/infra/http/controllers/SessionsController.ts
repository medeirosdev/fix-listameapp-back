import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSessionService from '@modules/users/services/CreateSessionService';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const userSession = container.resolve(CreateSessionService);

    const { user, token } = await userSession.execute({
      email,
      password,
    });

    delete user.password;

    return res.json({ user, token });
  }
}
