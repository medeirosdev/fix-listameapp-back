/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfilesController {
  public async show(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const showUser = container.resolve(ShowProfileService);

    const user = await showUser.execute({ user_id });

    delete user.password;

    return res.json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const {
      name,
      surname,
      email,
      login,
      bio,
      old_password,
      password,
    } = req.body;

    const updateUser = container.resolve(UpdateProfileService);

    const user = await updateUser.execute({
      user_id,
      name,
      surname,
      email,
      login,
      bio,
      old_password,
      password,
    });

    delete user.password;

    return res.json(user);
  }
}