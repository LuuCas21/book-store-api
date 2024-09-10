import express from 'express';
import { BookStoreSchema } from '../schemas/BookStoreSchema.js';
import { validateData } from '../middlewares/validationMiddleware.js';

export const router = express.Router();

// IMPORTS
import { getAllBooks, uploadBook, updateBook, deleteBook, uploadCover } from '../controllers/controllers.js';

router.get('/', getAllBooks);

router.post('/upload', validateData(BookStoreSchema), uploadBook);

router.post('/upload/cover', uploadCover);

router.put('/edit/:id', updateBook);

router.delete('/delete/:id', deleteBook);  