import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';

// IMPORTS
import { router } from './routes/routes';
import connectDB from './database/connectDB';
import Config from './config';

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());

// ERROR HANDLING MIDDLEWARE
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ msg: err.message });
});

// DATABASE
const port = Config.PORT;
const db = Config.DATABASE_URL.replace('<password>', Config.DATABASE_PASSWORD);

connectDB(db);

// SERVER/ROUTER
app.use('/books', router);

app.listen(3000, () => console.log(`Server is running on port ${port}`));