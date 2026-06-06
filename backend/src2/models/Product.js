import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title:         { type: String, required: true, trim: true },
  price:         { type: Number, required: true, min: 0 },
  originalPrice: { type: Number, default: 0 },
  images:        [{ type: String }],
  description:   { type: String, required: true },
  category:      { type: String, required: true, enum: ['Men', 'Women', 'Kids', 'Accessories', 'Footwear'] },
  stock:         { type: Number, default: 0, min: 0 },
  sizes:         [{ type: String }],
  isFeatured:    { type: Boolean, default: false },
  discount:      { type: Number, default: 0 },
  rating:        { type: Number, default: 4.0 },
  reviewCount:   { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
