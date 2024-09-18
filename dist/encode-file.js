import fs from 'fs';
export function base64_encode(req) {
    if (!req.file?.originalname)
        return;
    const img = fs.readFileSync(`${import.meta.dirname}/../uploads/${req.file.originalname}`, 'base64');
    const buffer = Buffer.from(img, 'base64');
    fs.writeFileSync(`${import.meta.dirname}/../img/`, buffer);
}
