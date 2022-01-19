/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateAgendaService from '@modules/agendas/services/CreateAgendaService';
import ShowAgendaService from '@modules/agendas/services/ShowAgendaService';
import ShowAgendaProfileService from '@modules/agendas/services/ShowAgendaProfileService';
import UpdateAgendaService from '@modules/agendas/services/UpdateAgendaService';
import DeleteAgendaService from '@modules/agendas/services/DeleteAgendaService';

export default class AgendasController {
  public async create(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { name, description, isPrivate } = req.body;

    const createAgenda = container.resolve(CreateAgendaService);

    const agenda = await createAgenda.execute({
      name,
      description,
      createdBy: user_id,
      isPrivate,
    });

    return res.json(classToClass(agenda));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const showAgenda = container.resolve(ShowAgendaService);

    const agenda = await showAgenda.execute(id);

    return res.json(classToClass(agenda));
  }

  public async indexProfile(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const showAgenda = container.resolve(ShowAgendaProfileService);

    const agenda = await showAgenda.execute(id);

    return res.json(classToClass(agenda));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, description, isPrivate } = req.body;

    const updateAgenda = container.resolve(UpdateAgendaService);

    const agenda = await updateAgenda.execute({
      id,
      name,
      description,
      isPrivate,
    });

    return res.json(classToClass(agenda));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;

    const deleteAgenda = container.resolve(DeleteAgendaService);

    const agenda = await deleteAgenda.execute(id);

    return res.json(classToClass(agenda));
  }
}
