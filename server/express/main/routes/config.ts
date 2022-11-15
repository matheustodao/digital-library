import { ConfigController } from '../modules/config';

import { Router } from 'express';

const configController = new ConfigController();

const router = Router();

router.patch('/config', configController.update);
router.post('/config', configController.create);
router.post('/login', configController.login);

export { router };
