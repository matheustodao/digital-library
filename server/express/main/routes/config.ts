import { Router } from 'express';
import { ConfigController } from '../modules/config';

const configController = new ConfigController();

const router = Router();

router.post('/config', configController.create);
router.post('/login', configController.login);

export { router };
