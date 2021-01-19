import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentRepository();

appointmentsRouter.get('/', (req, res) => {
  return res.json(appointmentsRepository.all());
});

appointmentsRouter.post('/', (req, res) => {
  try {
    const {
      userId,
      startDate,
      endDate,
      appointmentName,
      appointmentDescription,
      location,
    } = req.body;

    const parsedStartDate = parseISO(startDate);
    const parsedEndDate = parseISO(endDate);

    const createAppointment = new CreateAppointmentService(
      appointmentsRepository,
    );

    const appointment = createAppointment.execute({
      userId,
      startDate: parsedStartDate,
      endDate: parsedEndDate,
      appointmentName,
      appointmentDescription,
      location,
    });

    return res.json(appointment);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default appointmentsRouter;
