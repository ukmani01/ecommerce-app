import express from 'express';
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();
router.use(protect);

// POST /api/orders
router.post('/', async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    if (!cart || cart.items.length === 0)
      return res.status(400).json({ success: false, message: 'Cart is empty' });

    for (const item of cart.items) {
      if (item.product.stock < item.quantity)
        return res.status(400).json({ success: false, message: `Insufficient stock for ${item.product.title}` });
    }

    for (const item of cart.items) {
      await Product.findByIdAndUpdate(item.product._id, { $inc: { stock: -item.quantity } });
    }

    const order = await Order.create({
      user: req.user.id,
      items: cart.items.map(i => ({
        product:  i.product._id,
        name:     i.product.title,
        price:    i.price,
        quantity: i.quantity,
        image:    i.product.images?.[0] || '',
      })),
      totalAmount:     cart.totalAmount,
      shippingAddress: req.body.shippingAddress,
      paymentMethod:   req.body.paymentMethod || 'COD',
    });

    await Cart.findOneAndDelete({ user: req.user.id });
    res.status(201).json({ success: true, order });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// GET /api/orders/myorders
router.get('/myorders', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/orders/admin/all (admin)
router.get('/admin/all', admin, async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/orders/:id/status (admin)
router.put('/:id/status', admin, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, order });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// GET /api/orders/:id
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user.id });
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
