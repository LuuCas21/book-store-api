import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

// MULTER CONFIG
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, `${import.meta.dirname}/../tmp/`);
    },
    filename: function(req, file, cb) {
        const uniqueID = uuidv4();
        //cb(null, file.fieldname + '-' + uniqueID);
        cb(null, file.originalname);
    }
});

export const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
});

// MULTER - CHECK FILE TYPE
function checkFileType(file: Express.Multer.File, cb: multer.FileFilterCallback) {
    // Allowed file extensions
    const filetypes = /jpeg|jpg|png|gif/;
    // Check extension
    let extname: any;
    if ("originalname" in file) {
        extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    }
    // Check mime type
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Error: Image Only!'));
    }
}