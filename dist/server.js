import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
//import fileUpload from 'express-fileupload';
import CookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import path from 'path';
// IMPORTS
import { router } from './routes/routes.js'; // The extension is being added to automatically add .js extension to js files during compilation.
import connectDB from './database/connectDB.js';
import Config from './config.js';
const app = express();
// MIDDLEWARES
app.use(express.json());
app.use(express.static(path.join(import.meta.dirname, '/public')));
app.use(express.urlencoded({ extended: false }));
//app.use(fileUpload({ useTempFiles: true, tempFileDir: './tmp/' }));
app.use(helmet());
app.use(cors());
app.use(CookieParser());
app.use(methodOverride('_method'));
// ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
    res.status(500).json({ msg: err.message });
});
// DATABASE
const port = Config.PORT;
const db = Config.DATABASE_URL.replace('<password>', Config.DATABASE_PASSWORD);
connectDB(db);
// SERVER/ROUTER
app.use('/books', router);
app.listen(3000, () => console.log(`Server is running on port ${port}`));
