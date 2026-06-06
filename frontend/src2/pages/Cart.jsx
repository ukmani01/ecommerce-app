import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { IMG } from '../services/api';

const Cart = () => {
  const { cart, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();

  if (!cart.items?.length) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <div className="mb-8 p-6 rounded-full bg-neutral-100/50 backdrop-blur-xl">
        <ShoppingBag size={40} className="text-neutral-400" strokeWidth={1} />
      </div>
      <h2 className="text-2xl font-light tracking-tight text-neutral-900 mb-2">Your space is empty</h2>
      <p className="text-neutral-500 font-light mb-10 max-w-sm">There are currently no objects in your selection.</p>
      <Link to="/" className="px-8 py-3 bg-neutral-900 text-white rounded-full text-xs uppercase tracking-[0.2em] hover:bg-black transition-all">
        Continue Selection
      </Link>
    </div>
  );

  const delivery = cart.totalAmount >= 999 ? 0 : 99;
  const total    = cart.totalAmount + delivery;

  return (
    <div className="max-w-[1000px] mx-auto px-6 py-24">
      {/* Editorial Header */}
      <div className="mb-20">
        <h1 className="text-[3rem] font-light tracking-tighter text-neutral-900 mb-6">Cart.</h1>
        <div className="h-px w-20 bg-neutral-900" />
      </div>

      <div className="flex flex-col lg:flex-row gap-20 items-start">
        {/* Spatial Items List */}
        <div className="flex-1 w-full space-y-16">
          {cart.items.map((item) => (
            <div key={item.product._id} className="group flex items-center gap-8 border-b border-neutral-100 pb-12 last:border-0">
              <Link to={`/product/${item.product._id}`} className="relative w-24 h-32 overflow-hidden rounded-xl bg-neutral-100">
                <img src={IMG(item.product.images?.[0])} alt={item.product.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </Link>
              
              <div className="flex-1">
                <h3 className="text-lg font-light text-neutral-900 mb-1">{item.product.title}</h3>
                <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-6">{item.product.category}</p>
                
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-4">
                    <button onClick={() => updateQuantity(item.product._id, item.quantity - 1)} className="text-neutral-400 hover:text-neutral-900 transition-colors"><Minus size={12} /></button>
                    <span className="text-sm font-medium">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product._id, item.quantity + 1)} className="text-neutral-400 hover:text-neutral-900 transition-colors"><Plus size={12} /></button>
                  </div>
                  <button onClick={() => removeItem(item.product._id)} className="text-[10px] uppercase tracking-widest text-neutral-300 hover:text-red-500 transition-colors">Remove</button>
                </div>
              </div>

              <div className="text-right">
                <span className="text-sm font-light text-neutral-900">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Summary Module */}
        <div className="w-full lg:w-[320px] lg:sticky lg:top-24">
          <div className="p-8 rounded-[2rem] bg-white border border-neutral-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] backdrop-blur-xl">
            <h2 className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-8">Order Metadata</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm font-light">
                <span className="text-neutral-500">Subtotal</span>
                <span>₹{cart.totalAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm font-light">
                <span className="text-neutral-500">Delivery</span>
                <span>{delivery === 0 ? 'Free' : `₹${delivery}`}</span>
              </div>
            </div>

            <div className="flex justify-between items-center py-6 border-y border-neutral-100 mb-8">
              <span className="text-[10px] uppercase tracking-[0.2em]">Total</span>
              <span className="text-xl font-light">₹{total.toLocaleString('en-IN')}</span>
            </div>

            <button onClick={() => navigate('/checkout')} 
              className="w-full py-4 bg-neutral-900 text-white rounded-full text-[10px] uppercase tracking-[0.2em] hover:bg-black transition-all hover:scale-[1.01] flex items-center justify-center gap-3">
              Checkout <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;