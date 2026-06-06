import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, ShoppingBag, ChevronRight } from 'lucide-react';
import API, { IMG } from '../services/api';

/* ─── Design Tokens ───────────────────────────────────────────────────────── */
const token = {
  easing:  'cubic-bezier(0.16, 1, 0.3, 1)',
  easingIn:'cubic-bezier(0.4, 0, 1, 1)',
  radius:  'rounded-2xl',
  radiusLg:'rounded-3xl',
};

/* ─── Status System ───────────────────────────────────────────────────────── */
const STATUS = {
  PENDING:   { dot: 'bg-amber-400',   label: 'text-amber-700',  bg: 'bg-amber-50',   text: 'Pending'   },
  CONFIRMED: { dot: 'bg-sky-400',     label: 'text-sky-700',    bg: 'bg-sky-50',     text: 'Confirmed' },
  SHIPPED:   { dot: 'bg-violet-400',  label: 'text-violet-700', bg: 'bg-violet-50',  text: 'Shipped'   },
  DELIVERED: { dot: 'bg-emerald-400', label: 'text-emerald-700',bg: 'bg-emerald-50', text: 'Delivered' },
  CANCELLED: { dot: 'bg-neutral-400', label: 'text-neutral-500',bg: 'bg-neutral-100',text: 'Cancelled' },
};

/* ─── Shimmer Skeleton ────────────────────────────────────────────────────── */
const Shimmer = () => (
  <div className="space-y-4">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="bg-white rounded-2xl overflow-hidden border border-neutral-100">
        <div className="px-6 py-4 border-b border-neutral-50 flex items-center justify-between">
          <div className="flex gap-3">
            <div className="h-3 w-28 rounded-full bg-neutral-100 animate-pulse" />
            <div className="h-3 w-20 rounded-full bg-neutral-100 animate-pulse" />
          </div>
          <div className="h-5 w-20 rounded-full bg-neutral-100 animate-pulse" />
        </div>
        <div className="px-6 py-5 space-y-4">
          {[...Array(2)].map((_, j) => (
            <div key={j} className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-neutral-100 animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-3/4 rounded-full bg-neutral-100 animate-pulse" />
                <div className="h-3 w-1/3 rounded-full bg-neutral-100 animate-pulse" />
              </div>
              <div className="h-4 w-16 rounded-full bg-neutral-100 animate-pulse" />
            </div>
          ))}
        </div>
        <div className="px-6 py-4 border-t border-neutral-50 flex justify-between">
          <div className="h-3 w-32 rounded-full bg-neutral-100 animate-pulse" />
          <div className="h-3 w-20 rounded-full bg-neutral-100 animate-pulse" />
        </div>
      </div>
    ))}
  </div>
);

/* ─── Empty State ─────────────────────────────────────────────────────────── */
const EmptyState = () => (
  <div
    className="flex flex-col items-center justify-center py-28 bg-white rounded-3xl border border-neutral-100"
    style={{ animation: `ql-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) forwards` }}
  >
    <div className="w-16 h-16 rounded-2xl bg-neutral-50 flex items-center justify-center mb-6">
      <ShoppingBag size={28} className="text-neutral-300" strokeWidth={1.2} />
    </div>
    <h2 className="text-base font-medium text-neutral-800 tracking-tight">No orders yet</h2>
    <p className="text-sm text-neutral-400 mt-1.5 mb-8 text-center max-w-xs leading-relaxed">
      Your order history will appear here once you make your first purchase.
    </p>
    <Link
      to="/"
      className="
        px-6 py-2.5 rounded-full bg-neutral-900 text-white
        text-xs font-medium tracking-wide
        transition-all duration-300
        hover:bg-black hover:-translate-y-px
        hover:shadow-[0_4px_16px_rgba(0,0,0,0.14)]
        active:translate-y-0 active:shadow-none
      "
    >
      Explore Collection
    </Link>
  </div>
);

/* ─── Status Badge ────────────────────────────────────────────────────────── */
const StatusBadge = ({ status }) => {
  const s = STATUS[status] || STATUS.PENDING;
  return (
    <span className={`
      inline-flex items-center gap-1.5 px-3 py-1 rounded-full
      text-xs font-medium tracking-wide
      ${s.bg} ${s.label}
    `}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {s.text}
    </span>
  );
};

/* ─── Order Row ───────────────────────────────────────────────────────────── */
const OrderRow = ({ order, index }) => {
  const [expanded, setExpanded] = useState(false);
  const visible = order.items?.slice(0, expanded ? undefined : 2);
  const overflow = !expanded && order.items?.length > 2 ? order.items.length - 2 : 0;

  const date = new Date(order.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric'
  });

  return (
    <div
      className="
        bg-white rounded-2xl border border-neutral-100 overflow-hidden
        transition-all duration-500
        hover:border-neutral-200 hover:shadow-[0_2px_24px_rgba(0,0,0,0.05)]
      "
      style={{
        opacity: 0,
        animation: `ql-fade-up 0.55s cubic-bezier(0.16,1,0.3,1) ${index * 70}ms forwards`
      }}
    >
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-5 min-w-0">

          <div className="hidden sm:flex items-center gap-2">
            <Package size={13} className="text-neutral-300" strokeWidth={1.8} />
            <span className="text-xs tracking-wider uppercase text-neutral-400 font-medium">
              {order.orderId}
            </span>
          </div>

          <span className="hidden sm:block w-px h-3 bg-neutral-200" />

          <span className="text-xs text-neutral-400">{date}</span>

        </div>
        <StatusBadge status={order.status} />
      </div>

      {/* Divider */}
      <div className="h-px bg-neutral-50 mx-6" />

      {/* Items */}
      <div className="px-6 py-5 space-y-4">
        {visible?.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-4"
            style={{
              opacity: 0,
              animation: `ql-fade-up 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 40 + 60}ms forwards`
            }}
          >
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-neutral-50 border border-neutral-100 flex-shrink-0">
              <img
                src={IMG(item.image)}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-neutral-800 truncate tracking-tight">{item.name}</p>
              <p className="text-xs text-neutral-400 mt-0.5">
                {item.quantity} {item.quantity === 1 ? 'piece' : 'pieces'} · ₹{item.price.toLocaleString('en-IN')} each
              </p>
            </div>

            <span className="text-sm font-medium text-neutral-800 flex-shrink-0">
              ₹{(item.price * item.quantity).toLocaleString('en-IN')}
            </span>
          </div>
        ))}

        {overflow > 0 && (
          <button
            onClick={() => setExpanded(true)}
            className="text-xs text-neutral-400 hover:text-neutral-600 transition-colors duration-200 font-medium"
          >
            + {overflow} more item{overflow > 1 ? 's' : ''}
          </button>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-neutral-50/40 border-t border-neutral-50 flex items-center justify-between">

        <div className="flex items-baseline gap-1.5">
          <span className="text-xs text-neutral-400 font-normal">Order total</span>
          <span className="text-sm font-semibold text-neutral-900 tracking-tight">
            ₹{order.totalAmount.toLocaleString('en-IN')}
          </span>
        </div>

        <button
          className="
            group/btn flex items-center gap-1 text-xs font-medium text-neutral-500
            transition-colors duration-300 hover:text-neutral-900
          "
        >
          View order
          <ChevronRight
            size={13}
            className="transition-transform duration-300 group-hover/btn:translate-x-0.5"
            strokeWidth={2}
          />
        </button>

      </div>
    </div>
  );
};

/* ─── Orders Page ─────────────────────────────────────────────────────────── */
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/orders/myorders')
      .then(({ data }) => setOrders(data.orders))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">

      <style>{`
        @keyframes ql-fade-up {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Page header */}
      <div
        className="mb-10"
        style={{ animation: 'ql-fade-up 0.5s cubic-bezier(0.16,1,0.3,1) forwards' }}
      >
        <h1 className="text-xl font-semibold text-neutral-900 tracking-tight">Orders</h1>
        <p className="text-sm text-neutral-400 mt-1 font-normal">Your complete purchase history.</p>
      </div>

      {loading
        ? <Shimmer />
        : orders.length === 0
          ? <EmptyState />
          : (
            <div className="space-y-4">
              {orders.map((order, i) => (
                <OrderRow key={order._id} order={order} index={i} />
              ))}
            </div>
          )
      }

    </div>
  );
};

export default Orders;