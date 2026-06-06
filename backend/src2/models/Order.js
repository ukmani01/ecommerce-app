import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderId:  { type: String, unique: true },
  user:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product:  { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name:     String,
    price:    Number,
    quantity: Number,
    image:    String,
  }],
  totalAmount:     { type: Number, required: true },
  shippingAddress: {
    fullName: String,
    phone:    String,
    address:  String,
    city:     String,
    pincode:  String,
    state:    String,
  },
  status:          { type: String, default: 'PENDING', enum: ['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'] },
  paymentMethod:   { type: String, default: 'COD' },
  paymentStatus:   { type: String, default: 'PENDING', enum: ['PENDING', 'PAID', 'FAILED'] },
}, { timestamps: true });

orderSchema.pre('save', async function () {
  if (!this.orderId) {
    const count = await mongoose.model('Order').countDocuments();
    this.orderId = `ORD${Date.now()}${count + 1}`;
  }
  ;
});

export default mongoose.model('Order', orderSchema);
