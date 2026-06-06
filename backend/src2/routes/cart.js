import express from 'express';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
router.use(protect);

// GET /api/cart
router.get('/', async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    if (!cart) cart = { items: [], totalAmount: 0, totalItems: 0 };
    res.json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/cart/add
router.post('/add', async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    if (product.stock < quantity) return res.status(400).json({ success: false, message: 'Insufficient stock' });

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) cart = new Cart({ user: req.user.id, items: [] });

    const idx = cart.items.findIndex(i => i.product.toString() === productId);
    if (idx > -1) {
      cart.items[idx].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity, price: product.price });
    }
    await cart.save();
    await cart.populate('items.product');
    res.json({ success: true, cart });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PUT /api/cart/update
router.put('/update', async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });

    const idx = cart.items.findIndex(i => i.product.toString() === productId);
    if (idx === -1) return res.status(404).json({ success: false, message: 'Item not in cart' });

    if (quantity <= 0) {
      cart.items.splice(idx, 1);
    } else {
      cart.items[idx].quantity = quantity;
    }
    await cart.save();
    await cart.populate('items.product');
    res.json({ success: true, cart });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE /api/cart/:productId
router.delete('/:productId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });
    cart.items = cart.items.filter(i => i.product.toString() !== req.params.productId);
    await cart.save();
    await cart.populate('items.product');
    res.json({ success: true, cart });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE /api/cart (clear)
router.delete('/', async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user.id });
    res.json({ success: true, message: 'Cart cleared' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

export default router;
