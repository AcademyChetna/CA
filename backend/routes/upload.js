import express from 'express';
import multer from 'multer';
import imagekit from '../config/imagekit.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', verifyToken, upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    // Check if file is an image (based on MIME type)
    const isImage = req.file.mimetype.startsWith('image/');
    const isPdf = req.file.mimetype === 'application/pdf';

    // Prepare upload options
    const uploadOptions = {
      file: req.file.buffer.toString('base64'),
      fileName: `${Date.now()}-${req.file.originalname}`,
      useUniqueFileName: true,
    };

    // Apply transformations only for images (convert to WebP, compress)
    if (isImage) {
      uploadOptions.transformations = {
        format: 'webp',
        quality: 80,
      };
    } else if (isPdf) {
      // No transformation for PDFs
      // Optionally, you could set a transformation for PDFs if needed
    } else {
      // For other file types, just upload as is
    }

    const result = await imagekit.upload(uploadOptions);

    res.json({
      url: result.url,
      fileId: result.fileId,
      format: isImage ? 'webp' : 'original',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Upload failed' });
  }
});

export default router;