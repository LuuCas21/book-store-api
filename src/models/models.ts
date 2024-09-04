import mongoose from "mongoose";

const BookStoreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: false
    },
    price: {
        type: String,
        required: true,
        unique: false,
        default: '0.00'
    },
    author: {
        type: String,
        required: true,
        unique: false,
        default: 'Unknown'
    },
    image: {
        type: String,
        required: true,
        unique: false
    },
    genre: {
        type: String,
        required: true,
        unique: false
    },
    description: {
        type: String,
        required: true,
        default: 'No description provided',
        unique: false
    }
});

const BookStoreModel = mongoose.model('book-store', BookStoreSchema, 'books');

export default BookStoreModel;