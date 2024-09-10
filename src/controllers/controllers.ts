import path from 'path';
import { Request, Response, RequestHandler } from 'express';

// IMPORTS
import BookStoreModel from '../models/models';

// TYPES
type CredentialsRequestBody = {
    name: string;
    price: string;
    author: string;
    //image: string;
    description: string;
    genre: string;
};

type CredentialsParam = {
    id: string;
};

type CredentialsQuery = {
    genre: string;
    author: string;
    sort: string;
    fields: string;
    limit: number;
    page: number;
    skip: number;
};

export const getAllBooks: RequestHandler<any, any, any, CredentialsQuery> = async (req, res) => {
    try {
        const { genre, author, sort, fields } = req.query;

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
    } catch(err) {
        res.status(204).json({ msg: 'Fail' });
    }
};

export const uploadBook: RequestHandler<any, any, CredentialsRequestBody, any> = async (req, res) => {
    try {
        const { name, price, author, description, genre } = req.body;

        const imgElement = (req.files as { image: object }).image;
        let imgName: string | unknown;

        if ("name" in imgElement && "mv" in imgElement) {
           const imgPath = path.join('C:/Users/Lucas/Desktop/book-store/tmp/' + `${imgElement.name}`);
           (imgElement as { mv: Function }).mv(imgPath);
           imgName = imgElement.name;
        }

        await BookStoreModel.create({ name, price, author, imgName, description, genre });
        res.status(201).json({ success: true, msg: 'book uploaded' });
    } catch(err) {
        res.status(204).json({ msg: err });
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
