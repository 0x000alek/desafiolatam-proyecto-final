import { Router } from 'express';

import authMiddleware from '../middlewares/auth.middleware.js';
import publicationController from '../src/controllers/publication.controller.js';
import userController from '../src/controllers/user.controller.js';

const router = Router();

router.get(
  '/me',
  authMiddleware.verifyToken(),
  authMiddleware.attachProfileId,
  userController.findUserPrivateProfileById
);
router.get(
  '/:profileId',
  authMiddleware.verifyToken(true),
  userController.findUserPublicProfileById
);

router.post(
  '/me/publications',
  authMiddleware.verifyToken(),
  authMiddleware.attachProfileId,
  publicationController.create
);

router.delete(
  '/me/publications/:id',
  authMiddleware.verifyToken(),
  authMiddleware.attachProfileId,
  publicationController.deleteById
);

router.put(
  '/me/publications/:id',
  authMiddleware.verifyToken(),
  authMiddleware.attachProfileId,
  publicationController.update
);

export default router;
