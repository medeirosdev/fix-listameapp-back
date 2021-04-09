/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateProfileAvatarService from '@modules/users/services/UpdateProfileAvatarService';

export default class ProfilesAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const updateProfileAvatar = container.resolve(UpdateProfileAvatarService);

    const profile = await updateProfileAvatar.execute({
      user_id,
      avatarFileName: req.file.filename,
    });

    return res.json(classToClass(profile));
  }
}
