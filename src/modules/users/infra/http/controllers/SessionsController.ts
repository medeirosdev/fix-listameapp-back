import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateSessionService from '@modules/users/services/CreateSessionService';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const userSession = container.resolve(CreateSessionService);

    const { user, token } = await userSession.execute({
      email,
      password,
    });

    return res.json({ user: classToClass(user), token });
  }
}
