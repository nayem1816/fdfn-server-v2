const multer = require('multer');
const path = require('path');

//File Upload directory
const destinationUpload = './src/uploads/registration';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, destinationUpload);
    },
    filename: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname);
        const fileName =
            file.originalname
                .replace(fileExtension, '')
                .toLowerCase()
                .split(' ')
                .join('-') +
            '-' +
            Date.now() +
            fileExtension;
        cb(null, fileName);
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
            return cb(new Error('Please upload an image'));
        }
        cb(undefined, true);
    },
});

const uploadRegPic = upload.fields([
    { name: 'yourPhoto', maxCount: 1 },
    { name: 'nidFront', maxCount: 1 },
    { name: 'nidBack', maxCount: 1 },
]);

module.exports = uploadRegPic;
