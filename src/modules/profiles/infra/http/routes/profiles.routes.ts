/* eslint-disable camelcase */
import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProfilesController from '../controllers/ProfilesController';
import ProfilesAvatarController from '../controllers/ProfilesAvatarController';

const profilesRouter = Router();
const upload = multer(uploadConfig);
const profilesController = new ProfilesController();
const profilesAvatarController = new ProfilesAvatarController();

profilesRouter.use(ensureAuthenticated);

profilesRouter.patch(
  '/avatar',
  upload.single('avatar'),
  profilesAvatarController.update,
);

profilesRouter.patch('/', upload.single('avatar'), profilesController.update);

export default profilesRouter;
