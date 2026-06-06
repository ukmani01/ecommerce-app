import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, Truck, RotateCcw, Shield, Star, ChevronRight, Minus, Plus, Heart } from 'lucide-react';
import API, { IMG } from '../services/api';
import { useCart } from '../context/CartContext';
import PageLoader from '../components/PageLoader';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty]         = useState(1);
  const [size, setSize]       = useState('');
  const { addToCart }         = useCart();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const { data } = await API.get(`/products/${id}`);
        setProduct(data.product);
        if (data.product.sizes?.length) setSize(data.product.sizes[0]);
      } catch { /* 404 */ }
      finally { setLoading(false); }
    };
    fetch();
  }, [id]);

  if (loading) return <PageLoader />;
  if (!product) return (
    <div className="max-w-7xl mx-auto px-6 py-32 text-center">
      <h2 className="text-2xl font-light text-neutral-900">Product not found</h2>
      <Link to="/" className="inline-block mt-8 px-8 py-3 bg-neutral-900 text-white rounded-full text-sm hover:bg-neutral-800 transition-colors">Back to Shop</Link>
    </div>
  );

  const discount = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[11px] text-neutral-400 uppercase tracking-widest mb-10">
        <Link to="/" className="hover:text-neutral-900 transition-colors">Home</Link>
        <ChevronRight size={12} />
        <Link to={`/?category=${product.category}`} className="hover:text-neutral-900 transition-colors">{product.category}</Link>
      </nav>

      <div className="grid lg:grid-cols-12 gap-16">
        {/* Image Section */}
        <div className="lg:col-span-7">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-neutral-50">
            <img src={IMG(product.images?.[0])} alt={product.title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
            
            {discount > 0 && (
              <div className="absolute top-6 left-6">
                <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase">
                  {discount}% Off
                </span>
              </div>
            )}
            
            <button className="absolute top-6 right-6 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center hover:scale-105 transition-transform">
              <Heart size={18} className="text-neutral-900" />
            </button>
          </div>
        </div>

        {/* Details Section */}
        <div className="lg:col-span-5 flex flex-col pt-2">
          <div className="mb-6">
            <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-[0.2em] mb-3">{product.category}</p>
            <h1 className="text-4xl font-light text-neutral-900 leading-tight mb-6">{product.title}</h1>

            {product.rating > 0 && (
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < Math.floor(product.rating) ? 'fill-neutral-900 text-neutral-900' : 'fill-neutral-200 text-neutral-200'} />
                  ))}
                </div>
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-neutral-400">({product.reviewCount} reviews)</span>
              </div>
            )}

            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-3xl font-medium text-neutral-900">₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice > product.price && (
                <span className="text-lg text-neutral-400 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
              )}
            </div>
          </div>

          <div className="h-px bg-neutral-100 mb-8" />

          {/* Sizes */}
          {product.sizes?.length > 0 && (
            <div className="mb-8">
              <div className="flex justify-between mb-4">
                <p className="text-sm font-medium">Select Size</p>
                <span className="text-sm text-neutral-500">{size}</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map(s => (
                  <button key={s} onClick={() => setSize(s)}
                    className={`px-6 py-3 rounded-full text-sm transition-all border ${
                      size === s ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-white hover:border-neutral-400 border-neutral-200'
                    }`}>{s}</button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & CTA */}
          <div className="flex gap-4 mb-10">
            <div className="flex items-center bg-neutral-50 rounded-full p-1 border border-neutral-100">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-12 h-12 flex items-center justify-center hover:bg-white rounded-full transition-all"><Minus size={14} /></button>
              <span className="w-12 text-center text-sm font-semibold">{qty}</span>
              <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} className="w-12 h-12 flex items-center justify-center hover:bg-white rounded-full transition-all"><Plus size={14} /></button>
            </div>
            
            <button onClick={() => addToCart(product._id, qty)} disabled={product.stock === 0}
              className="flex-1 bg-neutral-900 text-white rounded-full font-medium hover:bg-black transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3">
              <ShoppingBag size={18} /> Add to Bag
            </button>
          </div>

          {/* Trust Badges */}
          <div className="space-y-4 mb-10">
            {[
              { icon: Truck, text: 'Free delivery on orders above ₹999' },
              { icon: RotateCcw, text: '7-day hassle-free returns' },
              { icon: Shield, text: 'Secure & encrypted payments' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-4 text-sm text-neutral-600">
                <Icon size={16} className="text-neutral-400" />
                {text}
              </div>
            ))}
          </div>

          {/* Description */}
          {product.description && (
            <div>
              <h3 className="text-sm font-medium mb-3">Details</h3>
              <p className="text-sm text-neutral-500 leading-relaxed font-light">{product.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;