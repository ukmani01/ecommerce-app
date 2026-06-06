import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import admin from "./src2/routes/admin.js"

import authRoutes from './src2/routes/auth.js';
import productRoutes from './src2/routes/product.js';
import cartRoutes from './src2/routes/cart.js';
import orderRoutes from './src2/routes/order.js';
import { errorHandler } from './src2/middleware/error.js';

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin',admin)
app.get('/api/health', (req, res) => res.json({ status: 'OK' }));
app.use(errorHandler);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB vvv Connected');
    app.listen(PORT, () => console.log(`🚀 Server vvvvvvvvvvv on port ${PORT}`));
  })
  .catch(err => console.error('DB Error:', err));