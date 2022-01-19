import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';
import AgendasController from '../controllers/AgendasController';
import AgendasAvatarController from '../controllers/AgendasAvatarController';

const upload = multer(uploadConfig);
const agendasRouter = Router();
const agendasController = new AgendasController();
const agendasAvatarController = new AgendasAvatarController();

agendasRouter.use(ensureAuthenticated);

agendasRouter.post('/', agendasController.create);
agendasRouter.get('/', agendasController.index);
agendasRouter.get('/profile', agendasController.indexProfile);
agendasRouter.put('/:id', agendasController.update);
agendasRouter.delete('/:id', agendasController.delete);

agendasRouter.patch(
  '/avatar/:id',
  upload.single('avatar'),
  agendasAvatarController.update,
);

export default agendasRouter;
