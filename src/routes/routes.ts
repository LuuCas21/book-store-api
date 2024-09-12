import express from 'express';
import { BookStoreSchema } from '../schemas/BookStoreSchema.js';
import { validateData } from '../middlewares/validationMiddleware.js';
import { validateToken } from '../token.js';

export const router = express.Router();

// IMPORTS
import { getAllBooks, createUser, updateBook, deleteBook, uploadCover, loginUser, myItems, updatePassword, logOutUser, addBooks } from '../controllers/controllers.js';

router.get('/', getAllBooks);
router.get('/items', validateToken, myItems);
router.get('/user/logout', logOutUser)

router.post('/upload', createUser);
router.post('/user/create', loginUser);
router.post('/upload/cover', uploadCover);

router.patch('/add/:id', validateToken, addBooks);
router.patch('/password/edit/:id', updatePassword);
router.patch('/edit/:id', updateBook);

router.delete('/delete/:id', deleteBook);  