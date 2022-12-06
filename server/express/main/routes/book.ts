import { BookController } from '../modules/book';

import { Router } from 'express';

const bookController = new BookController();

const router = Router();

router.get('/book/top/categories', bookController.getMostCommonCategories);
router.delete('/book/:bookId', bookController.delete);
router.get('/book/:bookId', bookController.getById);
router.patch('/book', bookController.update);
router.post('/book', bookController.create);
router.get('/book', bookController.find);

export { router };
