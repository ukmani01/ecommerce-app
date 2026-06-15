import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

const { default: Product } = await import('../models/Product.js');
const { default: User } = await import('../models/User.js');

const products = [
  { title: "Classic Cotton T-Shirt", price: 599, originalPrice: 999, images: ["img1.png"], description: "Premium soft cotton t-shirt", category: "Men", stock: 50, sizes: ["S","M","L","XL"], isFeatured: true },
  { title: "Women's Floral Dress", price: 1299, originalPrice: 2499, images: ["img1.png"], description: "Elegant floral print dress", category: "Women", stock: 30, sizes: ["XS","S","M","L"], isFeatured: true },
  { title: "Denim Jacket", price: 1999, originalPrice: 3999, images: ["img2.png"], description: "Classic denim jacket", category: "Men", stock: 25, sizes: ["S","M","L","XL"], isFeatured: false },
  { title: "Kids Party Wear Set", price: 899, originalPrice: 1599, images: ["img3.png"], description: "Kids party wear set", category: "Kids", stock: 40, sizes: ["2Y","4Y","6Y","8Y"], isFeatured: false },
  { title: "Running Sneakers", price: 1499, originalPrice: 2999, images: ["img4.png"], description: "Running shoes", category: "Footwear", stock: 60, sizes: ["6","7","8","9","10"], isFeatured: true },
  { title: "Pure Silk Saree", price: 2999, originalPrice: 5999, images: ["img5.png"], description: "Pure silk saree", category: "Women", stock: 15, sizes: ["Free"], isFeatured: true },
  { title: "Men's Formal Shirt", price: 999, originalPrice: 1999, images: ["img6.png"], description: "Formal shirt", category: "Men", stock: 45, sizes: ["S","M","L","XL"], isFeatured: false },
  { title: "Leather Wallet", price: 499, originalPrice: 999, images: ["img7.png"], description: "Leather wallet", category: "Accessories", stock: 100, sizes: ["Free"], isFeatured: false },
  { title: "Sports Training Shoes", price: 1999, originalPrice: 3999, images: ["img8.png"], description: "Sports shoes", category: "Footwear", stock: 35, sizes: ["6","7","8","9","10"], isFeatured: false },
  { title: "Summer Maxi Dress", price: 1599, originalPrice: 2999, images: ["img9.png"], description: "Maxi dress", category: "Women", stock: 28, sizes: ["XS","S","M","L","XL"], isFeatured: false },
  { title: "Hoodie Sweatshirt", price: 1299, originalPrice: 2499, images: ["img10.png"], description: "Hoodie", category: "Men", stock: 55, sizes: ["S","M","L","XL"], isFeatured: false },
  { title: "Women's Tote Handbag", price: 999, originalPrice: 1999, images: ["img11.png"], description: "Tote bag", category: "Accessories", stock: 40, sizes: ["Free"], isFeatured: true },
  { title: "Kids Sneakers", price: 699, originalPrice: 1299, images: ["img12.png"], description: "Kids shoes", category: "Footwear", stock: 50, sizes: ["3","4","5","6"], isFeatured: false },
  { title: "Aviator Sunglasses", price: 799, originalPrice: 1499, images: ["img13.png"], description: "Sunglasses", category: "Accessories", stock: 80, sizes: ["Free"], isFeatured: false },
  { title: "Women's Kurti Set", price: 1199, originalPrice: 2199, images: ["img14.png"], description: "Kurti set", category: "Women", stock: 35, sizes: ["XS","S","M","L","XL"], isFeatured: true },
  { title: "Men's Chino Pants", price: 1099, originalPrice: 1999, images: ["img.png"], description: "Chino pants", category: "Men", stock: 40, sizes: ["28","30","32","34","36"], isFeatured: false },
  { title: "Canvas Backpack", price: 1299, originalPrice: 2499, images: ["img.png"], description: "Backpack", category: "Accessories", stock: 60, sizes: ["Free"], isFeatured: false },
  { title: "Girls Frock", price: 599, originalPrice: 1099, images: ["img.png"], description: "Girls frock", category: "Kids", stock: 45, sizes: ["2Y","4Y","6Y","8Y"], isFeatured: false },
  { title: "Leather Belt", price: 399, originalPrice: 799, images: ["img.png"], description: "Belt", category: "Accessories", stock: 90, sizes: ["Free"], isFeatured: false },
  { title: "Ethnic Sherwani", price: 3999, originalPrice: 7999, images: ["img.png"], description: "Sherwani", category: "Men", stock: 10, sizes: ["S","M","L","XL"], isFeatured: true },
];

const seedDatabase = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error('MONGODB_URI not found');

    await mongoose.connect(uri);
    console.log('✅ MongoDB Connected');

    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log(`✅ ${products.length} products inserted`);

    // Clear existing users
    await User.deleteMany({});
    console.log('🗑️ Old users cleared');

    // ✅ FIXED: NO pre-hashing - Let User.js handle it
    await User.create([
      { name: 'Admin User', email: 'admin@ecom.com', password: 'Admin@123', role: 'admin' },
      { name: 'Test User', email: 'user@ecom.com', password: 'User@123', role: 'user' }
    ]);

    console.log('✅ Admin user created: admin@ecom.com / Admin@123');
    console.log('✅ Test user created: user@ecom.com / User@123');

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
};

seedDatabase();