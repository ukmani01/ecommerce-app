import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, CheckCircle, Shield, Truck, Lock } from 'lucide-react';
import API from '../services/api';
import { useCart } from '../context/CartContext';
import { IMG } from '../services/api';
import toast from 'react-hot-toast';

const Checkout = () => {
  const { cart, refreshCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ fullName: '', phone: '', address: '', city: '', pincode: '', state: '' });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleOrder = async (e) => {
    e.preventDefault();
    const { fullName, phone, address, city, pincode, state } = form;
    if (!fullName || !phone || !address || !city || !pincode || !state) { toast.error('Fill all fields'); return; }
    setLoading(true);
    try {
      await API.post('/orders', { shippingAddress: form, paymentMethod: 'COD' });
      await refreshCart();
      toast.success('Order placed successfully!');
      navigate('/orders');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not place order');
    } finally { setLoading(false); }
  };

  if (!cart.items?.length) { navigate('/cart'); return null; }

  const delivery = cart.totalAmount >= 999 ? 0 : 99;

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
        {/* Header */}
        <div className="mb-8 lg:mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Secure checkout</h1>
          <p className="text-sm text-neutral-500 mt-1">Complete your purchase with confidence</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-10">
          {/* LEFT COLUMN: FORM */}
          <form onSubmit={handleOrder} className="lg:col-span-3 space-y-6">
            {/* Address Section */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
              <div className="px-6 pt-6 pb-2 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <Package size={18} className="text-neutral-700" strokeWidth={1.7} />
                  <h2 className="text-base font-semibold text-neutral-900 tracking-tight">Delivery address</h2>
                </div>
                <p className="text-xs text-neutral-500 mt-1">All fields are required</p>
              </div>
              <div className="p-6">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5">Full name</label>
                    <input
                      value={form.fullName}
                      onChange={e => set('fullName', e.target.value)}
                      placeholder="Ravi Kumar"
                      className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100 transition-all duration-200 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5">Phone number</label>
                    <input
                      value={form.phone}
                      onChange={e => set('phone', e.target.value)}
                      placeholder="9876543210"
                      type="tel"
                      className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100 transition-all duration-200 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5">Pincode</label>
                    <input
                      value={form.pincode}
                      onChange={e => set('pincode', e.target.value)}
                      placeholder="641001"
                      className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100 transition-all duration-200 outline-none"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5">Address (House no., street, area)</label>
                    <textarea
                      value={form.address}
                      onChange={e => set('address', e.target.value)}
                      placeholder="House No, Street, Area"
                      rows={2}
                      className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100 transition-all duration-200 outline-none resize-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5">City</label>
                    <input
                      value={form.city}
                      onChange={e => set('city', e.target.value)}
                      placeholder="Tiruppur"
                      className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100 transition-all duration-200 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5">State</label>
                    <input
                      value={form.state}
                      onChange={e => set('state', e.target.value)}
                      placeholder="Tamil Nadu"
                      className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100 transition-all duration-200 outline-none"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
              <div className="px-6 pt-6 pb-2 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <Lock size={18} className="text-neutral-700" strokeWidth={1.7} />
                  <h2 className="text-base font-semibold text-neutral-900 tracking-tight">Payment method</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="relative rounded-xl border-2 border-emerald-200 bg-emerald-50/30 p-4 transition-all duration-200">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full border-2 border-emerald-600 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-neutral-800">Cash on Delivery (COD)</p>
                      <p className="text-xs text-neutral-500 mt-0.5">Pay when you receive your order</p>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                      Available
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-center gap-2 pt-2 text-xs text-neutral-500">
                  <Shield size={12} className="text-emerald-600" />
                  <span>100% secure transaction</span>
                  <span className="w-px h-3 bg-neutral-200 mx-1" />
                  <span>No hidden charges</span>
                </div>
              </div>
            </div>

            {/* Trust signals line */}
            <div className="flex items-center justify-center gap-4 text-[11px] font-medium text-neutral-500">
              <span className="flex items-center gap-1"><Lock size={11} /> SSL secure</span>
              <span className="w-px h-3 bg-neutral-300" />
              <span className="flex items-center gap-1"><Truck size={11} /> Easy returns</span>
              <span className="w-px h-3 bg-neutral-300" />
              <span className="flex items-center gap-1"><Shield size={11} /> Buyer protection</span>
            </div>

            {/* Place Order Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-neutral-900 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-all duration-300 hover:bg-neutral-800 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                `Place order — ₹${(cart.totalAmount + delivery).toLocaleString('en-IN')}`
              )}
            </button>
          </form>

          {/* RIGHT COLUMN: ORDER SUMMARY */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 bg-white rounded-2xl border border-neutral-200/80 shadow-sm overflow-hidden transition-all duration-300">
              <div className="px-5 py-4 border-b border-neutral-100 bg-neutral-50/30">
                <h2 className="text-sm font-semibold text-neutral-800">Order summary</h2>
                <p className="text-xs text-neutral-500 mt-0.5">{cart.totalItems} item{cart.totalItems !== 1 ? 's' : ''}</p>
              </div>

              {/* Product list */}
              <div className="max-h-80 overflow-y-auto divide-y divide-neutral-100">
                {cart.items.map(item => (
                  <div key={item.product._id} className="flex gap-3 p-4 hover:bg-neutral-50/50 transition-colors duration-200">
                    <div className="flex-shrink-0 w-14 h-16 rounded-lg bg-neutral-100 border border-neutral-200 overflow-hidden">
                      <img
                        src={IMG(item.product.images?.[0])}
                        alt={item.product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-800 line-clamp-2">{item.product.title}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-neutral-500">Qty {item.quantity}</span>
                        <span className="text-sm font-semibold text-neutral-900">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing breakdown */}
              <div className="p-5 border-t border-neutral-100 bg-white">
                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between text-neutral-600">
                    <span>Subtotal</span>
                    <span>₹{cart.totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span>Delivery charges</span>
                    {delivery === 0 ? (
                      <span className="text-emerald-700 font-medium">Free</span>
                    ) : (
                      <span>₹{delivery}</span>
                    )}
                  </div>
                  <div className="pt-3 mt-1 border-t border-neutral-100">
                    <div className="flex justify-between text-base font-bold text-neutral-900">
                      <span>Total</span>
                      <span className="tracking-tight">₹{(cart.totalAmount + delivery).toLocaleString('en-IN')}</span>
                    </div>
                    <p className="text-[11px] text-neutral-500 mt-1.5 text-center">Inclusive of all taxes</p>
                  </div>
                </div>
              </div>

              {/* Additional trust badge */}
              <div className="px-5 pb-5">
                <div className="flex items-center justify-center gap-1.5 text-[10px] font-medium text-neutral-500 bg-neutral-50 rounded-lg py-2">
                  <CheckCircle size={12} className="text-emerald-600" />
                  <span>Secure checkout powered by Drape</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;