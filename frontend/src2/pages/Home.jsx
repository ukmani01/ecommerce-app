import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, TrendingUp, Zap } from 'lucide-react';
// import heroImg from '../heroIMG/heroimg.png';
import API from '../services/api';
import ProductCard from '../components/ProductCard';
import PageLoader from '../components/PageLoader';
import { ArrowRight } from 'lucide-react';
import EditorialHero from "../components/EditorialHero"

const SORTS = [
  { label: 'Newest', value: '' },
  { label: 'Price: Low', value: 'price_asc' },
  { label: 'Price: High', value: 'price_desc' },
];

const CATEGORY_ITEMS = [
  {
    name: 'all',
    label: 'All',
    image:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=300&auto=format&fit=crop'
  },
  {
    name: 'Men',
    label: 'Men',
    image:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=300&auto=format&fit=crop'
  },
  {
    name: 'Women',
    label: 'Women',
    image:
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=300&auto=format&fit=crop'
  },
  {
    name: 'Kids',
    label: 'Kids',
    image:
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=300&auto=format&fit=crop'
  },
  {
    name: 'Footwear',
    label: 'Footwear',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=300&auto=format&fit=crop'
  },
  {
    name: 'Accessories',
    label: 'Accessories',
    image:
      'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=300&auto=format&fit=crop'
  }
];

const offers = [
  "https://images.unsplash.com/photo-1507680434567-5739c80be1ac?w=900&auto=format&fit=crop&q=60",
  "https://plus.unsplash.com/premium_photo-1687989650785-7edeaaddc7a7?w=900&auto=format&fit=crop&q=60",
  "https://plus.unsplash.com/premium_photo-1688497830977-f9ab9f958ca7?w=900&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1667284152861-36e03571486a?w=900&auto=format&fit=crop&q=60"
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('');
  const [heroIndex, setHeroIndex] = useState(0);
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get('search') || '';
  const urlCategory = searchParams.get('category') || '';

  useEffect(() => {
    if (urlCategory) setCategory(urlCategory);
  }, [urlCategory]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (category !== 'all') params.set('category', category);
        if (searchQuery) params.set('search', searchQuery);
        if (sort) params.set('sort', sort);
        const { data } = await API.get(`/products?${params}`);
        setProducts(data.products);
        console.log(data.products)
        if (data) {
          console.log("data comming sucessfully")
        } else {
          console.log("data is not comming")
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category, searchQuery, sort]);

  return (
    <div className="bg-neutral-50">
      <EditorialHero />

      {!searchQuery && (
        <div className="bg-white border-b border-neutral-100">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap justify-center gap-6 text-[11px] uppercase tracking-[0.12em] text-neutral-500">
            <span className="flex items-center gap-2">
              <TrendingUp size={12} /> 50K+ Customers
            </span>
            <span>Free Delivery ₹999+</span>
            <span>7-Day Returns</span>
            <span>COD Available</span>
          </div>
        </div>
      )}

      {/* OFFERS - MODIFIED: horizontal scroll on mobile, grid on desktop */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-lg md:text-xl font-semibold text-neutral-900 mb-6">
          Today's Deals
        </h2>

        {/* Mobile: horizontal scroll / Desktop: grid */}
        <div className="flex md:grid md:grid-cols-4 gap-4 overflow-x-auto pb-4 scrollbar-hide md:overflow-visible">
          {offers.map((img, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 w-72 md:w-auto rounded-2xl border border-neutral-100 group transition-all duration-300 hover:-translate-y-[2px] overflow-hidden"
            >
              <img
                src={img}
                className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                alt="offer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-0 p-4 text-white">
                <p className="text-sm font-medium">Flat 40% OFF</p>
                <p className="text-xs text-white/70">Limited time deal</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-neutral-900">
            {searchQuery ? `Results for "${searchQuery}"` : 'Products'}
          </h2>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-neutral-200 rounded-full px-4 py-2 text-sm"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <PageLoader />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {products.map((p, i) => (
              <div
                key={p._id}
                className="transition-all duration-300 hover:-translate-y-[2px]"
              >
                <ProductCard product={p} index={i} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;