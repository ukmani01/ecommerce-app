# 🛍️ MERN E‑Commerce App

A full‑stack e‑commerce platform built with **React (Vite)**, **Tailwind CSS**, **Node.js**, **Express**, **MongoDB Atlas**, and **JWT authentication**.  
Designed with a mobile‑first approach – a responsive hero section, product listing with filters, shopping cart, order management, and an admin dashboard.

---

## ✨ Features

### 👤 User Features
- **Authentication** – Register, Login, JWT token (7 days expiry)
- **Product Browsing** – Grid layout, search by title, filter by category (Men, Women, Kids, Footwear, Accessories)
- **Product Sorting** – Price low‑to‑high, price high‑to‑low, newest first
- **Shopping Cart** – Add/update/remove items, view total, clear cart
- **Checkout & Orders** – Place order (COD), view order history, track status (PENDING → CONFIRMED → SHIPPED → DELIVERED)
- **Responsive Design** – Optimized for mobile, tablet, and laptop screens

### 🛠️ Admin Features
- **Admin Dashboard** – View total products, users, orders, revenue, pending/delivered orders, low‑stock alerts
- **Product Management** – Add new product, edit product, delete product (full CRUD)
- **Order Management** – Update order status (allows admin to mark orders as confirmed/shipped/delivered/cancelled)
- **User Management** – View all registered users (admin only)

### 🎨 Frontend Highlights
- **Hero Section** – Full‑screen background image (your own high‑res image on laptop, separate mobile image)
- **Today's Deals** – Horizontal scroll on mobile, 4‑col grid on desktop (smooth hover animations)
- **Product Cards** – Image, title, price, original price (strikethrough), discount badge, “Add to Cart” button
- **Shopping Cart Page** – List of items, quantity controls, remove item, total amount, proceed to checkout
- **Order Success / History** – Order confirmation, list of past orders with status
- **Admin Dashboard** – Charts / cards for metrics, product management table, order list with status update buttons

### 🔧 Backend API (RESTful)
| Endpoint                     | Method | Description                     | Access        |
|------------------------------|--------|---------------------------------|---------------|
| `/api/auth/register`         | POST   | User registration               | Public        |
| `/api/auth/login`            | POST   | User login, returns JWT         | Public        |
| `/api/auth/me`               | GET    | Get current user profile        | User          |
| `/api/products`              | GET    | Get all products (with query: category, search, sort) | Public |
| `/api/products/:id`          | GET    | Get single product              | Public        |
| `/api/products`              | POST   | Create product                  | Admin         |
| `/api/products/:id`          | PUT    | Update product                  | Admin         |
| `/api/products/:id`          | DELETE | Delete product                  | Admin         |
| `/api/cart`                  | GET    | Get user's cart                 | User          |
| `/api/cart/add`              | POST   | Add item to cart                | User          |
| `/api/cart/update`           | PUT    | Update quantity                 | User          |
| `/api/cart/:productId`       | DELETE | Remove item from cart           | User          |
| `/api/cart`                  | DELETE | Clear entire cart               | User          |
| `/api/orders`                | POST   | Place order                     | User          |
| `/api/orders/myorders`       | GET    | User’s order history            | User          |
| `/api/orders/:id`            | GET    | Single order details            | User          |
| `/api/orders/admin/all`      | GET    | All orders (admin)              | Admin         |
| `/api/orders/:id/status`     | PUT    | Update order status             | Admin         |
| `/api/admin/dashboard`       | GET    | Dashboard metrics               | Admin         |
| `/api/admin/users`           | GET    | List all users                  | Admin         |

---

## 🚀 Tech Stack

### Frontend
- **React 18** + **Vite** – fast build tool
- **Tailwind CSS** – utility‑first styling
- **React Router DOM** – client‑side routing
- **Axios** – HTTP requests
- **Lucide React** – icons
- **React Hot Toast** – notifications

### Backend
- **Node.js** + **Express** – REST API
- **MongoDB Atlas** – cloud database
- **Mongoose** – ODM
- **JWT** – authentication
- **bcryptjs** – password hashing
- **CORS** – cross‑origin resource sharing

### Deployment
- **Frontend** – Vercel (or Render Static Site)
- **Backend** – Render (Web Service)
- **Database** – MongoDB Atlas (free tier)

---

## 📦 Installation & Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ukmani01/ecommerce-app.git
   cd ecommerce-app