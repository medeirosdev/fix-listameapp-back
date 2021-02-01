import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '@modules/profiles/services/UpdateProfileService';

export default class ProfilesController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { login, bio } = req.body;
    const { id } = req.user;

    const updateProfile = container.resolve(UpdateProfileService);

    const profile = await updateProfile.execute({
      user_id: id,
      login,
      bio,
    });

    return res.json(profile);
  }
}
