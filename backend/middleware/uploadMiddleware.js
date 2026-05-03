const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('../config/s3');

// File filter (allow only images + pdf)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only JPG, PNG, and PDF files are allowed'), false);
    }
};

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,

        contentType: multerS3.AUTO_CONTENT_TYPE,

        key: function (req, file, cb) {
            const fileName = `${Date.now()}-${file.originalname}`;
            cb(null, fileName);
        },
    }),

    fileFilter,

    limits: { fileSize: 5 * 1024 * 1024 }
});

module.exports = upload;