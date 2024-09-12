import mongoose from 'mongoose';

const BookStoreSchema = new mongoose.Schema({
    book_name: {
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

const UserAccountSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true,
        unique: true
    },
    user_password: {
        type: String,
        required: true,
        unique: true
    },
    user_role: {
        type: String,
        required: true,
        default: 'buyer'
    },
    books: {
        type: [BookStoreSchema],
        required: false
    }
}, { minimize: false });

const BookStoreModel = mongoose.model('book-store', UserAccountSchema, 'book-users');

export default BookStoreModel;


/* 
{"books": [{
        "book_name": "The Other Side of Midnight",
        "price": "20",
        "author": "Sidney Sheldon",
        "image": "/",
        "genre": "Romance",
        "description": "The Other Side Of Midnight features a tale that explores deceit and manipulation, in the context of an obsession by a woman of power. Noelle Page and Catherine Alexander are the two main characters in this book, and the conflict between them is the main premise of the novel. A thorough character sketch is presented for both these characters in terms of their upbringing, attitudes, ideologies, etc.Noelle Page is a born as a result of an extra-marital affair, and ends up blossoming into a beautiful woman. She has an air of superiority about her, and nourishes great ambitions. By the time she mature into a woman, his father sells her on the pretext of getting her a job as a model.Noelle runs away to Paris where she meets the pilot, Larry Douglas, a person she falls in love with and who she remains obsessed with for the rest of her life. After Larry forgets about her love, Noelle swears vengeance. Catherine, on the other hand, is an insecure woman who comes from a family with broken dreams. She never had the courage to explore her sexuality in her youth, and so, became a social outcast with an inferiority complex.Catherine eventually meets Larry and ends up marrying him. She becomes a bone of contention for Noelle, who having risen high up in social ladder, plans to have Larry all to herself. The themes of obsession and jealousy are constantly highlighted throughout the book. The reissue edition of The Other Side Of Midnight was published in 2005 by HarperCollins. It is available in the form of a paperback."
}]
}
*/


/* 
const BookStoreSchema = new mongoose.Schema({
    book_name: {
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
*/