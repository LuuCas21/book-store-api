import express from 'express';
import { body } from 'express-validator';

// IMPORTS
import { getAllBooks, createUser, updateBook, deleteBook, uploadCover, loginUser, myItems, updatePassword, logOutUser, addBooks } from '../controllers/controllers.js';
import { validateInput } from '../input-validation.js';
import { validateToken } from '../token.js';
import { upload } from '../multer-config.js';

export const router = express.Router();

// RETRIEVE ALL BOOKS
router.get('/', getAllBooks);

// RETRIEVE USER ADDED BOOKS
router.get('/items', validateToken, myItems);

// LOG OUT USER
router.get('/user/logout', logOutUser);

// CREATE USER ACCOUNT
router.post('/user/create', validateInput([
    body('user_name').notEmpty().trim().escape(),
    body('user_email').notEmpty().isEmail().trim().escape().normalizeEmail(),
    body('user_password').notEmpty().isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches('[0-9]').withMessage('Password must contain a number')
    .matches('[A-Z]').withMessage('Password must contain an uppercase letter').trim().escape(),
    body('user_role').notEmpty().isLength({ max: 6 }).trim().escape()
]), createUser); 

// LOG IN USER
router.post('/user/login', validateInput([
    body('user_name').notEmpty().withMessage('username field cannot be empty').trim().escape(),
    body('user_password').notEmpty().withMessage('password field cannot be empty').trim().escape()
]), loginUser);

// UPLOAD BOOK COVER
router.patch('/upload/cover/:doc/:id', upload.single('book_cover'), uploadCover);

// ADD BOOK
router.patch('/add/:id', validateInput([
    body('books.**').notEmpty().withMessage('Field cannot be empty').trim().escape()
]), upload.single('book_cover'), addBooks);

// EDIT PASSWORD
router.patch('/password/edit/:id', validateInput([
    body('user_password').notEmpty().isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches('[0-9]').withMessage('Password must contain a number')
    .matches('[A-Z]').withMessage('Password must contain an uppercase letter').trim().escape()
]), updatePassword);

// EDIT BOOK
router.patch('/edit/:id', validateInput([body('books.**').notEmpty().withMessage('Field cannot be empty').trim().escape()
]), updateBook);

// DELETE BOOK
router.patch('/delete/:doc/:id', deleteBook);  