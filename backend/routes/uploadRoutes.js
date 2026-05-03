const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware'); // multer-s3 config
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/upload
// @access  Private
router.post('/', protect, upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        res.status(200).json({
            message: 'File uploaded successfully',
            fileUrl: req.file.location,
            fileName: req.file.key
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Upload failed', error: error.message });
    }
});

module.exports = router;