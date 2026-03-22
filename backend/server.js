import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import experimentRoutes from './routes/experiments.js';
import studyModuleRoutes from './routes/studyModules.js';
import productRoutes from './routes/products.js';
import contactRoutes from './routes/contact.js';
import uploadRoutes from './routes/upload.js';
import productInquiryRoutes from './routes/productInquiry.js';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/experiments', experimentRoutes);
app.use('/api/study-modules', studyModuleRoutes);
app.use('/api/products', productRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/product-inquiry', productInquiryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});