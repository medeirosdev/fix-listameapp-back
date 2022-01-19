import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProfileAppointmentsController from '../controllers/ProfileAppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const profileAppointmentsController = new ProfileAppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', appointmentsController.create);
appointmentsRouter.get('/profile', profileAppointmentsController.index);
appointmentsRouter.delete('/', profileAppointmentsController.delete);

export default appointmentsRouter;
