import { BookController } from '../modules/book';

import { Router } from 'express';

const bookController = new BookController();

const router = Router();

router.delete('/book/:bookId', bookController.delete);
router.get('/book/:bookId', bookController.getById);
router.patch('/book', bookController.update);
router.post('/book', bookController.create);

export { router };
