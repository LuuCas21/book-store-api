import { RequestHandler } from 'express';

// IMPORTS
import BookStoreModel from '../models/models';

// TYPES
type CredentialsRequestBody = {
    name: string,
    price: string,
    author: string,
    image: string,
    description: string
};

type CredentialsParam = {
    id: string;
};

type CredentialsQuery = {
    genre: string;
    author: string;
    sort: string;
};

export const getAllBooks: RequestHandler<any, any, any, CredentialsQuery> = async (req, res) => {
    try {
        const { genre, author, sort } = req.query;

        interface QueryObject {
            author: object;
            genre: object;
        };

        let queryObj: Partial<QueryObject> = {};

        if (author) {
            queryObj.author = { $regex: author, $options: 'i' };
        }

        if (genre) {
            queryObj.genre = { $regex: genre, $options: 'i' };
        }

        let result = BookStoreModel.find(queryObj);

        if (sort) {
            result = result.sort(sort);
        }

        const books = await result;

        res.status(200).json({ data: books });
    } catch(err) {
        res.status(204).json({ msg: 'Fail' });
    }
};

export const uploadBook: RequestHandler<any, any, CredentialsRequestBody, any> = async (req, res) => {
    const { name, price, author, image, description } = req.body;
    try {
        await BookStoreModel.create({ name, price, author, image, description });
        res.status(201).json({ success: true, msg: 'book uploaded' });
    } catch(err) {
        res.status(204).json({ msg: 'Failed to create item' });
    }
};

export const updateBook:RequestHandler<CredentialsParam, any, CredentialsRequestBody, any> = async (req, res) => {
    try {
        await BookStoreModel.findByIdAndUpdate({ _id: req.params.id }, req.body);
        res.status(204).json({ msg: 'Book edited' });
    } catch(err) {
        res.status(204).json({ msg: 'Failed to update item' });
    }
};

export const deleteBook: RequestHandler<CredentialsParam, any, any, any> = async (req, res) => {
    try {
        await BookStoreModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: 'Book deleted' });
    } catch(err) {
        res.status(204).json({ msg: 'Failed to delete item' });
    }
};
