import { Link } from 'react-router-dom';
import { ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { IMG } from '../services/api';

const ProductCard = ({ product, index = 0 }) => {
  const { addToCart } = useCart();

  const discount =
    product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) * 100
        )
      : 0;

  const delay = index * 55;

  return (
    <article
      className="group relative"
      style={{
        opacity: 0,
        animation: `ql-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms forwards`,
      }}
    >
      <style>{`
        @keyframes ql-fade-up {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ── IMAGE ZONE (navigation only) ─────────────────────── */}
      <Link to={`/product/${product._id}`} className="block" tabIndex={-1} aria-hidden="true">
        <div className="relative overflow-hidden rounded-2xl bg-[#f5f4f2]">

          <div className="aspect-[4/5] overflow-hidden">
            <img
              src={IMG(product.images?.[0])}
              alt={product.title}
              loading="lazy"
              className="
                h-full w-full object-cover
                transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                group-hover:scale-[1.025] group-hover:brightness-[1.03]
              "
            />
          </div>

          {/* Soft vignette on hover */}
          <div className="
            absolute inset-0 rounded-2xl
            bg-gradient-to-t from-black/[0.04] via-transparent to-transparent
            opacity-0 transition-opacity duration-500
            group-hover:opacity-100
          " />

          {/* ── Minimal badges ───────────────────────────────── */}
          <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5">
            {discount > 0 && (
              <span className="
                text-[10px] font-medium tracking-[0.12em] uppercase
                text-neutral-700 bg-white/80 backdrop-blur-md
                rounded-full px-2.5 py-0.5
              ">
                −{discount}%
              </span>
            )}
            {product.isFeatured && (
              <span className="
                flex items-center gap-1.5
                text-[10px] font-medium tracking-[0.12em] uppercase
                text-neutral-700 bg-white/80 backdrop-blur-md
                rounded-full px-2.5 py-0.5
              ">
                <span className="w-1 h-1 rounded-full bg-neutral-500 inline-block" />
                Featured
              </span>
            )}
          </div>

          {/* ── Wishlist (top-right) ─────────────────────────── */}
          <div className="
            absolute top-3.5 right-3.5
            opacity-0 translate-y-1
            transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
            group-hover:opacity-100 group-hover:translate-y-0
          ">
            <button
              onClick={(e) => e.preventDefault()}
              aria-label="Save to wishlist"
              className="
                flex h-8 w-8 items-center justify-center
                rounded-full bg-white/85 backdrop-blur-md
                text-neutral-500 transition-colors duration-300
                hover:text-neutral-900 hover:bg-white
              "
            >
              <Heart size={13} strokeWidth={1.6} />
            </button>
          </div>

          {/* ── Out of Stock overlay ─────────────────────────── */}
          {product.stock === 0 && (
            <div className="
              absolute inset-0 flex items-center justify-center
              bg-white/60 backdrop-blur-[2px] rounded-2xl
            ">
              <span className="
                rounded-full bg-neutral-900/90 backdrop-blur-sm
                px-4 py-1 text-[10px] font-medium tracking-[0.18em] uppercase text-white
              ">
                Sold Out
              </span>
            </div>
          )}

        </div>
      </Link>

      {/* ── META + ACTION ZONE ───────────────────────────────── */}
      <div className="pt-4 px-0.5">

        {/* Category */}
        <p className="
          text-[9px] font-semibold uppercase tracking-[0.22em]
          text-neutral-400 mb-1.5
        ">
          {product.category}
        </p>

        {/* Title — navigation link */}
        <Link to={`/product/${product._id}`}>
          <h3 className="
            line-clamp-2 text-[0.9rem] font-medium leading-[1.4]
            text-neutral-800 tracking-[-0.01em]
            transition-colors duration-300 hover:text-neutral-900
          ">
            {product.title}
          </h3>
        </Link>

        {/* Rating — minimal */}
        {product.rating > 0 && (
          <div className="mt-2 flex items-center gap-1.5">
            <div className="flex gap-[2px]">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  width="9" height="9" viewBox="0 0 10 10"
                  className={i < Math.floor(product.rating)
                    ? 'fill-neutral-500'
                    : 'fill-neutral-200'}
                >
                  <path d="M5 0.5l1.12 2.27 2.51.37-1.82 1.77.43 2.5L5 6.27 2.76 7.41l.43-2.5L1.37 3.14l2.51-.37z" />
                </svg>
              ))}
            </div>
            {product.reviewCount > 0 && (
              <span className="text-[10px] text-neutral-400 font-normal">
                {product.reviewCount}
              </span>
            )}
          </div>
        )}

        {/* Price + CTA */}
        <div className="mt-3.5 flex items-center justify-between">

          <div className="flex items-baseline gap-2">
            <span className="text-[0.95rem] font-medium tracking-[-0.02em] text-neutral-900">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-neutral-400 line-through font-normal">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product._id);
            }}
            disabled={product.stock === 0}
            aria-label={`Add ${product.title} to cart`}
            className="
              flex items-center gap-1.5
              rounded-full border border-neutral-200 bg-white
              px-3.5 py-1.5
              text-[11px] font-medium tracking-[0.06em] text-neutral-700
              transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]
              hover:-translate-y-[1px] hover:border-neutral-300
              hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]
              active:translate-y-0 active:shadow-none
              disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0
            "
          >
            <ShoppingBag size={11} strokeWidth={1.8} />
            Add
          </button>

        </div>

      </div>
    </article>
  );
};

export default ProductCard;