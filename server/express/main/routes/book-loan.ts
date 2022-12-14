import { BookLoanController } from '../modules/book-loan';

import { Router } from 'express';

const bookLoanController = new BookLoanController();

const router = Router();

router.get('/book-loan/by/month', bookLoanController.bookLoanByMonth);
router.get('/dashboard', bookLoanController.bookLoanReport);
router.get('/book-loan/:loanBookId', bookLoanController.getById);
router.get('/book-loan', bookLoanController.find);

router.delete('/book-loan/:loanBookId', bookLoanController.delete);
router.patch('/book-loan', bookLoanController.update);
router.post('/book-loan', bookLoanController.create);

export { router };
