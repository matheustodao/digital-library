import { ImportController } from '../modules/import';
import { multerConfig } from '../config/multer';

import { Router } from 'express';
import multer from 'multer';

const importController = new ImportController();

const router = Router();
const upload = multer(multerConfig);

router.post(
	'/import/loans',
	upload.single('loans'),
	importController.importBookLoan
);
router.post(
	'/import/books',
	upload.single('books'),
	importController.importBook
);

export { router };
