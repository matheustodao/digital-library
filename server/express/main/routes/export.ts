import { ExportController } from '../modules/export';

import { Router } from 'express';

const exportController = new ExportController();

const router = Router();

router.post('/export', exportController.exportData);

export { router };
