import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (req, res) => {
  const appointmentsRepository = getCustomRepository(AppointmentRepository);
  const appointments = await appointmentsRepository.find();
  return res.json(appointments);
});

appointmentsRouter.post('/', async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default appointmentsRouter;
