/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateAgendaAvatarService from '@modules/agendas/services/UpdateAgendaAvatarService';

export default class AgendasAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { id } = req.params;

    const updateAgendaAvatar = container.resolve(UpdateAgendaAvatarService);

    const agenda = await updateAgendaAvatar.execute({
      user_id,
      agendaId: id,
      avatarFileName: req.file.filename,
    });

    return res.json(classToClass(agenda));
  }
}
