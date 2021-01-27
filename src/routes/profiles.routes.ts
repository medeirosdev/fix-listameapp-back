import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';

import UpdateProfileService from '../services/UpdateProfileService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profilesRouter = Router();
const upload = multer(uploadConfig);

profilesRouter.use(ensureAuthenticated);

profilesRouter.patch('/', upload.single('avatar'), async (req, res) => {
  try {
    // const { login, bio, avatar } = req.body;
    // const { id } = req.user;

    // const updateProfile = new UpdateProfileService();

    // const profile = await updateProfile.execute({
    //   id,
    //   login,
    //   bio,
    //   avatar,
    // });

    // return res.json(profile);
    return res.json(req.file);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default profilesRouter;
