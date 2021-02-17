import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProfileAppointmentsController from '../controllers/ProfileAppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const profileAppointmentsController = new ProfileAppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (req, res) => {
//   const appointments = await appointmentsRepository.find();
//   return res.json(appointments);
// });

appointmentsRouter.post('/', appointmentsController.create);
appointmentsRouter.get('/profile', profileAppointmentsController.index);

export default appointmentsRouter;
