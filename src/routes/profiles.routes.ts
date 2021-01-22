import { Router } from 'express';

import UpdateProfileService from '../services/UpdateProfileService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profilesRouter = Router();

profilesRouter.use(ensureAuthenticated);

profilesRouter.patch('/', async (req, res) => {
  try {
    const { login, bio, avatar } = req.body;
    const { id } = req.user;

    const updateProfile = new UpdateProfileService();

    const profile = await updateProfile.execute({
      id,
      login,
      bio,
      avatar,
    });

    return res.json(profile);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default profilesRouter;
