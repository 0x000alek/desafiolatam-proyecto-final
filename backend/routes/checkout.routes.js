import { Router } from 'express';

import checkoutController from '../src/controllers/checkout.controller.js';

const router = Router();

router.post('/', checkoutController.checkout);

export default router;