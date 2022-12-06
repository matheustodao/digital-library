import { Router } from 'express';
import { googleBookController } from '../modules/google-book';

const router = Router();

router.get('/google/books', googleBookController.index)

export { router };