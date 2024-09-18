import bcrypt from 'bcrypt';
import fs from 'fs';
import { promisify } from 'util';
// IMPORTS
import BookStoreModel from '../models/models.js';
import { createToken } from '../token.js';
export const getAllBooks = async (req, res) => {
    try {
        const { genre, author, sort, fields } = req.query;
        ;
        let queryObj = {};
        if (author) {
            queryObj.author = { $regex: author, $options: 'i' };
        }
        if (genre) {
            queryObj.genre = { $regex: genre, $options: 'i' };
        }
        let result = BookStoreModel.find(queryObj);
        if (sort) {
            const sortList = sort.split(',').join(' ');
            result = result.sort(sortList);
        }
        if (fields) {
            const fieldsList = fields.split(',').join(' ');
            result = result.select(fieldsList);
        }
        const arrConv = Object.keys(queryObj);
        const page = req.query.page || 1;
        const limit = req.query.limit || arrConv.length;
        const skip = (page - 1) * limit;
        result = result.skip(skip).limit(limit);
        const books = await result;
        res.status(200).json({ books });
    }
    catch (err) {
        res.status(204).json({ msg: 'Fail' });
    }
};
// CREATE USER SYSTEM 
export const createUser = async (req, res) => {
    try {
        const { user_name, user_password, user_role, user_email, books } = req.body;
        console.log(req.body);
        const hash = bcrypt.hashSync(user_password, 10);
        await BookStoreModel.create({ user_name, user_password: hash, user_email, user_role });
        res.status(201).json({ success: true, msg: 'user created' });
    }
    catch (err) {
        console.log(err);
        res.status(204).json({ msg: err });
    }
};
export const addBooks = async (req, res) => {
    const { book_name, price, author, description, genre, image } = req.body;
    try {
        if (!req.file?.originalname)
            return;
        // CONVERTING IMAGE TO BASE64 BUFFER
        const img = fs.readFileSync(`${import.meta.dirname}/../../tmp/${req.file.originalname}`, "base64");
        const buffer = Buffer.from(img, "base64");
        // DECODING BASE64 TO IMAGE AND STORING IN IMG FOLDER
        fs.writeFileSync(`${import.meta.dirname}/../../img/${req.file.originalname}`, buffer); // THATS FOR TESTING
        console.log(buffer);
        // DELETING IMAGE STORED IN UPLOAD FOLDER BY MULTER
        fs.unlinkSync(req.file.path);
        // await BookStoreModel.findByIdAndUpdate(req.params.id, { $addToSet: { books: req.body.books } }, { runValidators: true });
        await BookStoreModel.findByIdAndUpdate(req.params.id, { $addToSet: { books: { book_name, price, author, image: buffer, genre, description } } }, { runValidators: true });
        res.status(201).json({ msg: 'Book added' });
    }
    catch (err) {
        res.status(400).json({ msg: err });
    }
};
export const updateBook = async (req, res) => {
    try {
        await BookStoreModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { runValidators: true });
        res.status(201).json({ msg: 'Book edited' });
    }
    catch (err) {
        res.status(204).json({ msg: 'Failed to update item' });
    }
};
export const deleteBook = async (req, res) => {
    try {
        await BookStoreModel.findByIdAndUpdate({ _id: req.params.doc }, { $pull: { books: { _id: req.params.id } } });
        res.status(200).json({ msg: 'Book deleted' });
    }
    catch (err) {
        res.status(204).json({ msg: 'Failed to delete item' });
    }
};
// UPDATE PASSWORD
export const updatePassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { user_password } = req.body;
        const editedPass = bcrypt.hashSync(user_password, 10);
        await BookStoreModel.findByIdAndUpdate(id, { user_password: editedPass }, { runValidators: true });
        res.status(201).json({ msg: 'password edited' });
    }
    catch (err) {
        res.status(400).json({ msg: err });
    }
};
// LOGIN SYSTEM
export const loginUser = async (req, res) => {
    try {
        const { user_name, user_password } = req.body;
        const user = await BookStoreModel.findOne({ user_name }, 'user_name user_password user_role');
        if (!user)
            return console.log('Something went wrong');
        const credentials = bcrypt.compareSync(user_password, user.user_password);
        if (!credentials)
            return res.status(400).json({ success: false, msg: "username or password incorrect" });
        const token = createToken(user_name, user.user_role, user._id.toString());
        res.cookie('access-token', token, {
            maxAge: 60 * 60 * 24 * 30 * 1000,
            httpOnly: true
        });
        res.status(200).json({ success: true, msg: 'Successfully logged in' });
    }
    catch (err) {
        res.status(400).json({ success: false, msg: 'Failed to log in' });
    }
};
// LOG OUT SYSTEM
export const logOutUser = (req, res) => {
    res.clearCookie('access-token');
    res.status(200).json({ msg: "user logged out" });
};
// USER ITEMS
export const myItems = async (req, res) => {
    const user = await BookStoreModel.findById(req.userInfo.user_id);
    res.status(200).json({ msg: "logged in", user });
};
// BOOK COVER UPLOAD
export const uploadCover = async (req, res) => {
    const unlinkAsync = promisify(fs.unlink);
    try {
        if (!req.file?.originalname)
            return;
        // CONVERTING IMAGE TO BASE64 BUFFER
        const img = fs.readFileSync(`${import.meta.dirname}/../../tmp/${req.file.originalname}`, "base64");
        const buffer = Buffer.from(img, "base64");
        // DECODING BASE64 TO IMAGE AND STORING IN IMG FOLDER
        fs.writeFileSync(`${import.meta.dirname}/../../img/${req.file.originalname}`, buffer);
        await BookStoreModel.findByIdAndUpdate({ _id: req.params.id }, { $addToSet: {} });
        // DELETING IMAGE STORED IN UPLOAD FOLDER BY MULTER
        // await unlinkAsync(req.file.path);
        res.status(201).json({ msg: 'uploaded' });
    }
    catch (err) {
    }
};
