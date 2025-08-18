import { Router } from 'express';

import authMiddleware from '../middlewares/auth.middleware.js';
import publicationController from '../src/controllers/publication.controller.js';

const router = Router();

router.get(
  '/',
  authMiddleware.verifyToken(true),
  publicationController.findAll
);
router.get(
  '/:id',
  authMiddleware.verifyToken(true),
  publicationController.findById
);

router.post(
  '/:id/favorites',
  authMiddleware.verifyToken(),
  authMiddleware.attachProfileId,
  publicationController.markOrUnmarkAsFavorite
);

export default router;
