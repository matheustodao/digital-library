import { BackupController } from '../modules/backup';

import { Router } from 'express';

const backupController = new BackupController();

const router = Router();

router.post('/backup', backupController.backupData);

export { router };
