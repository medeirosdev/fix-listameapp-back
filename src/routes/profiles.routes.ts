/* eslint-disable camelcase */
import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';

import UpdateProfileService from '../services/UpdateProfileService';
import UpdateProfileAvatarService from '../services/UpdateProfileAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profilesRouter = Router();
const upload = multer(uploadConfig);

profilesRouter.use(ensureAuthenticated);

profilesRouter.patch('/avatar', upload.single('avatar'), async (req, res) => {
  try {
    // const { login, bio, avatar } = req.body;
    const { id: user_id } = req.user;

    const updateProfileAvatar = new UpdateProfileAvatarService();

    const profile = await updateProfileAvatar.execute({
      user_id,
      avatarFileName: req.file.filename,
    });

    return res.json(profile);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

profilesRouter.patch('/', upload.single('avatar'), async (req, res) => {
  try {
    const { login, bio } = req.body;
    const { id } = req.user;

    const updateProfile = new UpdateProfileService();

    const profile = await updateProfile.execute({
      user_id: id,
      login,
      bio,
    });

    return res.json(profile);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default profilesRouter;
