import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentRepository from '@modules/appointments/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (req, res) => {
  const appointmentsRepository = getCustomRepository(AppointmentRepository);
  const appointments = await appointmentsRepository.find();
  return res.json(appointments);
});

appointmentsRouter.post('/', async (req, res) => {
  const {
    userId,
    groupId,
    startDate,
    endDate,
    appointmentName,
    appointmentDescription,
    location,
    isPrivate,
  } = req.body;

  const parsedStartDate = parseISO(startDate);
  const parsedEndDate = parseISO(endDate);

  const createAppointment = new CreateAppointmentService();

  const appointment = await createAppointment.execute({
    userId,
    groupId,
    startDate: parsedStartDate,
    endDate: parsedEndDate,
    appointmentName,
    appointmentDescription,
    location,
    isPrivate,
  });

  return res.json(appointment);
});

export default appointmentsRouter;
