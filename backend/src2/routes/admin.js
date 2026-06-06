import express from 'express';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();
router.use(protect, admin);

// GET /api/admin/dashboard
router.get('/dashboard', async (req, res) => {
  try {
    const [totalProducts, totalUsers, totalOrders, revenueResult] = await Promise.all([
      Product.countDocuments(),
      User.countDocuments({ role: 'user' }),
      Order.countDocuments(),
      Order.aggregate([
        { $match: { status: { $ne: 'CANCELLED' } } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } },
      ]),
    ]);

    const pendingOrders    = await Order.countDocuments({ status: 'PENDING' });
    const deliveredOrders  = await Order.countDocuments({ status: 'DELIVERED' });
    const lowStockProducts = await Product.countDocuments({ stock: { $lt: 10 } });

    res.json({
      success: true,
      totalProducts,
      totalUsers,
      totalOrders,
      totalRevenue:    revenueResult[0]?.total || 0,
      pendingOrders,
      deliveredOrders,
      lowStockProducts,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/admin/users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
