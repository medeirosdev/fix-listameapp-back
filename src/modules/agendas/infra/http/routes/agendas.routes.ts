import { Router } from 'express';

import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';
import AgendasController from '../controllers/AgendasController';
import AgendasAvatarController from '../controllers/AgendasAvatarController';

const agendasRouter = Router();
const agendasController = new AgendasController();
const agendasAvatarController = new AgendasAvatarController();

agendasRouter.use(ensureAuthenticated);

agendasRouter.post('/', agendasController.create);
agendasRouter.get('/', agendasController.index);
agendasRouter.put('/:id', agendasController.update);
agendasRouter.put('/avatar/:id', agendasAvatarController.update);

export default agendasRouter;
