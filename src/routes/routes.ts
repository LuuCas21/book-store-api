import express from 'express';
import { BookStoreSchema } from '../schemas/BookStoreSchema';
import { validateData } from '../middlewares/validationMiddleware';

export const router = express.Router();

// IMPORTS
import { getAllBooks, uploadBook, updateBook, deleteBook } from '../controllers/controllers';

router.get('/', getAllBooks);

router.post('/upload', validateData(BookStoreSchema), uploadBook);

router.put('/edit/:id', updateBook);

router.delete('/delete/:id', deleteBook); 