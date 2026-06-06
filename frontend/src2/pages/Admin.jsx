import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Package, Users, DollarSign, ShoppingBag, Plus, Edit2, Trash2, TrendingUp, AlertCircle, X, Check, Calendar, ArrowUpRight, ArrowDownRight, Search } from 'lucide-react';
import API, { IMG } from '../services/api';
import toast from 'react-hot-toast';
import PageLoader from '../components/PageLoader';

const CATS = ['Men', 'Women', 'Kids', 'Accessories', 'Footwear'];
const STATUSES = ['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
const EMPTY = { title: '', price: 0, originalPrice: 0, description: '', category: 'Men', stock: 0, images: ['img1.png'], sizes: [], isFeatured: false };

// Status styles for dark theme (neutral base, subtle colored dots)
const STATUS_STYLES = {
  PENDING: 'bg-zinc-800/60 text-zinc-300 ring-1 ring-zinc-700 before:bg-amber-500',
  CONFIRMED: 'bg-zinc-800/60 text-zinc-300 ring-1 ring-zinc-700 before:bg-sky-500',
  SHIPPED: 'bg-zinc-800/60 text-zinc-300 ring-1 ring-zinc-700 before:bg-indigo-400',
  DELIVERED: 'bg-zinc-800/60 text-zinc-300 ring-1 ring-zinc-700 before:bg-emerald-500',
  CANCELLED: 'bg-zinc-800/60 text-zinc-400 ring-1 ring-zinc-700 before:bg-zinc-500',
};

const STATUS_DOT = {
  PENDING: 'bg-amber-500',
  CONFIRMED: 'bg-sky-500',
  SHIPPED: 'bg-indigo-400',
  DELIVERED: 'bg-emerald-500',
  CANCELLED: 'bg-zinc-500',
};

// Helper: get start/end timestamps for current and previous month
const getMonthRange = (date) => {
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59);
  return { start, end };
};

const Admin = () => {
  const [tab, setTab] = useState('dashboard');
  const [stats, setStats] = useState({});
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [s, p, o, u] = await Promise.all([
        API.get('/admin/dashboard'),
        API.get('/products'),
        API.get('/orders/admin/all'),
        API.get('/admin/users'),
      ]);
      setStats(s.data);
      setProducts(p.data.products);
      setOrders(o.data.orders);
      setUsers(u.data.users);
    } catch { toast.error('Failed to load data'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  // ─────────────────────────────────────────────────────────────────
  // REAL METRICS & TRENDS (computed from actual orders/users data)
  // ─────────────────────────────────────────────────────────────────
  const realMetrics = useMemo(() => {
    const now = new Date();
    const currentMonth = getMonthRange(now);
    const prevMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const prevMonth = getMonthRange(prevMonthDate);

    // Revenue this month vs last month
    const currentRevenue = orders
      .filter(o => new Date(o.createdAt) >= currentMonth.start && new Date(o.createdAt) <= currentMonth.end)
      .reduce((sum, o) => sum + o.totalAmount, 0);
    const prevRevenue = orders
      .filter(o => new Date(o.createdAt) >= prevMonth.start && new Date(o.createdAt) <= prevMonth.end)
      .reduce((sum, o) => sum + o.totalAmount, 0);
    const revenueGrowth = prevRevenue === 0 ? (currentRevenue > 0 ? 100 : 0) : ((currentRevenue - prevRevenue) / prevRevenue) * 100;

    // Order volume growth
    const currentOrdersCount = orders.filter(o => new Date(o.createdAt) >= currentMonth.start && new Date(o.createdAt) <= currentMonth.end).length;
    const prevOrdersCount = orders.filter(o => new Date(o.createdAt) >= prevMonth.start && new Date(o.createdAt) <= prevMonth.end).length;
    const ordersGrowth = prevOrdersCount === 0 ? (currentOrdersCount > 0 ? 100 : 0) : ((currentOrdersCount - prevOrdersCount) / prevOrdersCount) * 100;

    // User growth (based on createdAt)
    const currentUsersCount = users.filter(u => new Date(u.createdAt) >= currentMonth.start && new Date(u.createdAt) <= currentMonth.end).length;
    const prevUsersCount = users.filter(u => new Date(u.createdAt) >= prevMonth.start && new Date(u.createdAt) <= prevMonth.end).length;
    const usersGrowth = prevUsersCount === 0 ? (currentUsersCount > 0 ? 100 : 0) : ((currentUsersCount - prevUsersCount) / prevUsersCount) * 100;

    // Real fulfillment rate
    const deliveredOrders = orders.filter(o => o.status === 'DELIVERED').length;
    const fulfillmentRate = orders.length === 0 ? 0 : (deliveredOrders / orders.length) * 100;

    // Low stock trend: compare number of products with stock < 10 (current vs previous data? we can't track history, show neutral)
    // Instead compute lowStockCount from current products
    const lowStockCount = products.filter(p => p.stock < 10).length;

    return {
      revenueGrowth: Math.round(revenueGrowth * 10) / 10,
      ordersGrowth: Math.round(ordersGrowth * 10) / 10,
      usersGrowth: Math.round(usersGrowth * 10) / 10,
      fulfillmentRate: Math.round(fulfillmentRate * 10) / 10,
      lowStockCount,
      currentRevenue,
      currentOrdersCount,
    };
  }, [orders, users, products]);

  // Build KPI cards with real trend values
  const statsCards = [
    { label: 'Total Products', value: stats.totalProducts || 0, icon: ShoppingBag, trendValue: null, trendDir: 'neutral' },
    { label: 'Total Orders', value: stats.totalOrders || 0, icon: Package, trendValue: realMetrics.ordersGrowth, trendDir: realMetrics.ordersGrowth >= 0 ? 'up' : 'down' },
    { label: 'Total Users', value: stats.totalUsers || 0, icon: Users, trendValue: realMetrics.usersGrowth, trendDir: realMetrics.usersGrowth >= 0 ? 'up' : 'down' },
    { label: 'Revenue', value: `₹${(stats.totalRevenue || 0).toLocaleString('en-IN')}`, icon: DollarSign, trendValue: realMetrics.revenueGrowth, trendDir: realMetrics.revenueGrowth >= 0 ? 'up' : 'down' },
    { label: 'Pending Orders', value: stats.pendingOrders || 0, icon: AlertCircle, trendValue: null, trendDir: 'neutral' },
    { label: 'Low Stock Items', value: realMetrics.lowStockCount, icon: TrendingUp, trendValue: null, trendDir: 'neutral' },
  ];

  const openAdd = () => { setEditing(null); setForm(EMPTY); setModal(true); };
  const openEdit = (p) => { setEditing(p); setForm({ ...p, images: p.images || ['img1.png'] }); setModal(true); };
  const closeModal = () => { setModal(false); setEditing(null); setForm(EMPTY); };

  const handleSave = async () => {
    if (!form.title || !form.description) { toast.error('Title & description required'); return; }
    setSaving(true);
    try {
      if (editing) { await API.put(`/products/${editing._id}`, form); toast.success('Product updated'); }
      else { await API.post('/products', form); toast.success('Product added'); }
      closeModal();
      fetchAll();
    } catch (err) { toast.error(err.response?.data?.message || 'Save failed'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try { await API.delete(`/products/${id}`); toast.success('Deleted'); fetchAll(); }
    catch { toast.error('Delete failed'); }
  };

  const handleStatus = async (orderId, status) => {
    try { await API.put(`/orders/${orderId}/status`, { status }); toast.success('Status updated'); fetchAll(); }
    catch { toast.error('Update failed'); }
  };

  if (loading) return <PageLoader />;

  const TABS = ['dashboard', 'products', 'orders', 'users'];
  const fieldLabel = "block text-[10px] font-semibold text-zinc-400 uppercase tracking-[0.08em] mb-1.5";
  const inputBase = "w-full rounded-lg border border-zinc-700 bg-zinc-900/60 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none focus:border-zinc-500 focus:bg-zinc-900 focus:ring-2 focus:ring-zinc-700 transition-all duration-150";

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="max-w-[1520px] mx-auto px-5 sm:px-8 lg:px-10 py-6 lg:py-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-zinc-100">Commerce Control</h1>
            <p className="text-xs text-zinc-400 mt-0.5">Operations & business intelligence</p>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-2 bg-zinc-900/80 rounded-lg border border-zinc-800 px-3 py-1.5">
              <Calendar size={14} className="text-zinc-500" />
              <span className="text-xs font-medium text-zinc-300">Last 30 days</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-200 flex items-center justify-center text-xs font-semibold select-none">
              AD
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-zinc-800 mb-8">
          <nav className="flex gap-6">
            {TABS.map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`relative pb-3 text-xs font-medium capitalize transition-colors duration-150 ${tab === t ? 'text-zinc-100' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                {t}
                {tab === t && <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-zinc-100 rounded-full" />}
              </button>
            ))}
          </nav>
        </div>

        {/* DASHBOARD */}
        {tab === 'dashboard' && (
          <div className="space-y-6">
            {/* KPI Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
              {statsCards.map(({ label, value, icon: Icon, trendValue, trendDir }) => {
                const TrendIcon = trendDir === 'up' ? ArrowUpRight : (trendDir === 'down' ? ArrowDownRight : null);
                const trendColor = trendDir === 'up' ? 'text-emerald-400' : (trendDir === 'down' ? 'text-rose-400' : 'text-zinc-500');
                const trendBg = trendDir === 'up' ? 'bg-emerald-950/40' : (trendDir === 'down' ? 'bg-rose-950/40' : 'bg-zinc-800');
                const showTrend = trendValue !== null && trendDir !== 'neutral';
                return (
                  <div key={label} className="group bg-zinc-900/60 rounded-xl border border-zinc-800/80 hover:border-zinc-700 transition-all duration-200">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center">
                          <Icon size={15} className="text-zinc-300" strokeWidth={1.8} />
                        </div>
                        {showTrend && (
                          <div className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-md ${trendBg}`}>
                            <TrendIcon size={10} className={trendColor} />
                            <span className={`text-[10px] font-semibold tabular-nums ${trendColor}`}>{Math.abs(trendValue)}%</span>
                          </div>
                        )}
                      </div>
                      <p className="text-2xl font-semibold text-zinc-100 tracking-tight tabular-nums">{value}</p>
                      <p className="mt-1 text-[10px] font-medium text-zinc-500 uppercase tracking-[0.07em]">{label}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Insights row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Real revenue trend (mini chart from actual monthly data) */}
              <div className="bg-zinc-900/60 rounded-xl border border-zinc-800/80 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-semibold text-zinc-200">Revenue trend (last 6 months)</h3>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${realMetrics.revenueGrowth >= 0 ? 'bg-emerald-950/40 text-emerald-400' : 'bg-rose-950/40 text-rose-400'}`}>
                    {realMetrics.revenueGrowth >= 0 ? '+' : ''}{realMetrics.revenueGrowth}% vs prev month
                  </span>
                </div>
                <div className="h-24 flex items-end gap-1.5">
                  {Array(6).fill(0).map((_, i) => {
                    // Simulate simple distribution using real current revenue as baseline, just for visual
                    const height = 20 + Math.random() * 60; // Not actual, but we want to keep real data? Better show placeholder bars based on actual monthly revenue if we compute. To avoid fake, we use actual monthly revenues from orders.
                    // For brevity, compute actual monthly revenues from available orders (last 6 months)
                    const months = [];
                    for (let j = 5; j >= 0; j--) {
                      const d = new Date();
                      d.setMonth(d.getMonth() - j);
                      const { start, end } = getMonthRange(d);
                      const rev = orders.filter(o => new Date(o.createdAt) >= start && new Date(o.createdAt) <= end).reduce((s, o) => s + o.totalAmount, 0);
                      months.push(rev);
                    }
                    const maxRev = Math.max(...months, 1);
                    const barHeight = (months[i] / maxRev) * 100;
                    return (
                      <div
                        key={i}
                        className="flex-1 bg-zinc-800 hover:bg-zinc-700 rounded-sm transition-colors duration-150"
                        style={{ height: `${Math.max(8, barHeight)}%` }}
                      />
                    );
                  })}
                </div>
                <p className="text-[10px] text-zinc-500 mt-3 text-center">Monthly revenue (₹ thousands)</p>
              </div>

              {/* Real fulfillment rate */}
              <div className="bg-zinc-900/60 rounded-xl border border-zinc-800/80 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-semibold text-zinc-200">Fulfillment rate</h3>
                  <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-md">{realMetrics.fulfillmentRate}%</span>
                </div>
                <div className="pt-1">
                  <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full transition-all duration-700" style={{ width: `${realMetrics.fulfillmentRate}%` }} />
                  </div>
                  <div className="flex justify-between mt-3 text-[10px] text-zinc-500 font-medium">
                    <span>Pending</span>
                    <span>Shipped</span>
                    <span>Delivered</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PRODUCTS TABLE - SaaS grade */}
        {tab === 'products' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-zinc-200">Inventory catalog</span>
                <span className="text-[10px] text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded-md font-mono">{products.length} SKUs</span>
              </div>
              <button onClick={openAdd} className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-100 px-3.5 py-2 text-xs font-medium text-zinc-900 hover:bg-zinc-200 transition-all duration-150">
                <Plus size={14} /> Add product
              </button>
            </div>

            <div className="bg-zinc-900/40 rounded-xl border border-zinc-800/80 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="sticky top-0 z-10 bg-zinc-900/95 backdrop-blur-sm">
                    <tr className="border-b border-zinc-800">
                      <th className="text-left text-[10px] font-semibold text-zinc-400 uppercase tracking-wider px-5 py-3">Product</th>
                      <th className="text-left text-[10px] font-semibold text-zinc-400 uppercase tracking-wider px-4 py-3">Category</th>
                      <th className="text-left text-[10px] font-semibold text-zinc-400 uppercase tracking-wider px-4 py-3">Price</th>
                      <th className="text-left text-[10px] font-semibold text-zinc-400 uppercase tracking-wider px-4 py-3">Stock</th>
                      <th className="text-left text-[10px] font-semibold text-zinc-400 uppercase tracking-wider px-4 py-3">Featured</th>
                      <th className="px-5 py-3 text-right text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p, idx) => (
                      <tr key={p._id} className={`group border-b border-zinc-800/60 hover:bg-zinc-800/30 transition-colors ${idx % 2 === 0 ? 'bg-transparent' : 'bg-zinc-900/20'}`}>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700 overflow-hidden flex-shrink-0">
                              <img src={IMG(p.images?.[0])} alt={p.title} className="w-full h-full object-cover" />
                            </div>
                            <span className="text-xs font-medium text-zinc-200 max-w-[220px] truncate">{p.title}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-[10px] font-medium text-zinc-400 bg-zinc-800/60 border border-zinc-700 px-2 py-0.5 rounded-md uppercase tracking-wide">{p.category}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs font-semibold text-zinc-100 tabular-nums">₹{p.price.toLocaleString('en-IN')}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-14 h-1 bg-zinc-800 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${p.stock < 10 ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{ width: `${Math.min(100, (p.stock / 100) * 100)}%` }} />
                            </div>
                            <span className={`text-[11px] font-mono font-semibold ${p.stock < 10 ? 'text-rose-400' : 'text-zinc-300'}`}>{p.stock}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {p.isFeatured ? <Check size={13} className="text-emerald-500" /> : <span className="text-zinc-600 text-xs">—</span>}
                        </td>
                        <td className="px-5 py-3 text-right">
                          <div className="inline-flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                            <button onClick={() => openEdit(p)} className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"><Edit2 size={13} /></button>
                            <button onClick={() => handleDelete(p._id)} className="p-1.5 rounded-md text-zinc-400 hover:text-rose-400 hover:bg-zinc-800"><Trash2 size={13} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ORDERS TABLE */}
        {tab === 'orders' && (
          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="text-xs font-semibold text-zinc-200">Order workflow queue</span>
              <span className="text-[10px] text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded-md font-mono">{orders.length} transactions</span>
            </div>
            <div className="bg-zinc-900/40 rounded-xl border border-zinc-800/80 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="sticky top-0 bg-zinc-900/95 backdrop-blur-sm">
                    <tr className="border-b border-zinc-800">
                      <th className="text-left text-[10px] font-semibold text-zinc-400 uppercase tracking-wider px-5 py-3">Order ID</th>
                      <th className="text-left text-[10px] font-semibold text-zinc-400 uppercase tracking-wider px-5 py-3">Customer</th>
                      <th className="text-left text-[10px] font-semibold text-zinc-400 uppercase tracking-wider px-5 py-3">Amount</th>
                      <th className="text-left text-[10px] font-semibold text-zinc-400 uppercase tracking-wider px-5 py-3">Status</th>
                      <th className="text-left text-[10px] font-semibold text-zinc-400 uppercase tracking-wider px-5 py-3">Update</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o, idx) => (
                      <tr key={o._id} className={`group border-b border-zinc-800/60 hover:bg-zinc-800/30 transition-colors ${idx % 2 === 0 ? 'bg-transparent' : 'bg-zinc-900/20'}`}>
                        <td className="px-5 py-3.5"><span className="text-[11px] font-mono font-semibold text-zinc-400">#{o.orderId}</span></td>
                        <td className="px-5 py-3.5">
                          <p className="text-xs font-medium text-zinc-200">{o.user?.name || '—'}</p>
                          <p className="text-[10px] text-zinc-500 font-mono">{o.user?.email}</p>
                        </td>
                        <td className="px-5 py-3.5"><span className="text-xs font-semibold text-zinc-100">₹{o.totalAmount.toLocaleString('en-IN')}</span></td>
                        <td className="px-5 py-3.5">
                          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${STATUS_STYLES[o.status]}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[o.status]}`} />
                            {o.status}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <select
                            defaultValue={o.status}
                            onChange={e => handleStatus(o._id, e.target.value)}
                            className="text-[11px] font-mono border border-zinc-700 rounded-lg px-2.5 py-1 bg-zinc-900 text-zinc-200 outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-700"
                          >
                            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* USERS TABLE */}
        {tab === 'users' && (
          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="text-xs font-semibold text-zinc-200">User directory</span>
              <span className="text-[10px] text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded-md font-mono">{users.length} accounts</span>
            </div>
            <div className="bg-zinc-900/40 rounded-xl border border-zinc-800/80 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="sticky top-0 bg-zinc-900/95">
                    <tr className="border-b border-zinc-800">
                      <th className="text-left text-[10px] font-semibold text-zinc-400 uppercase tracking-wider px-5 py-3">User</th>
                      <th className="text-left text-[10px] font-semibold text-zinc-400 uppercase tracking-wider px-5 py-3">Email</th>
                      <th className="text-left text-[10px] font-semibold text-zinc-400 uppercase tracking-wider px-5 py-3">Role</th>
                      <th className="text-left text-[10px] font-semibold text-zinc-400 uppercase tracking-wider px-5 py-3">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u, idx) => (
                      <tr key={u._id} className={`group border-b border-zinc-800/60 hover:bg-zinc-800/30 transition-colors ${idx % 2 === 0 ? 'bg-transparent' : 'bg-zinc-900/20'}`}>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center text-xs font-semibold">{u.name?.charAt(0).toUpperCase()}</div>
                            <span className="text-xs font-medium text-zinc-200">{u.name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5"><span className="text-[11px] font-mono text-zinc-400">{u.email}</span></td>
                        <td className="px-5 py-3.5">
                          <span className={`inline-flex rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase ${u.role === 'admin' ? 'bg-zinc-700 text-zinc-100' : 'bg-zinc-800 text-zinc-400 border border-zinc-700'}`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="px-5 py-3.5"><span className="text-[11px] font-mono text-zinc-500">{new Date(u.createdAt).toLocaleDateString('en-IN')}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* MODAL - dark refined */}
        {modal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-150">
            <div className="bg-zinc-900 rounded-2xl w-full max-w-[520px] shadow-2xl border border-zinc-800 max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
                <div>
                  <h2 className="text-sm font-semibold text-zinc-100">{editing ? 'Edit SKU' : 'Create new SKU'}</h2>
                  <p className="text-[11px] text-zinc-500 mt-0.5">{editing ? 'Update product details' : 'Add to inventory'}</p>
                </div>
                <button onClick={closeModal} className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800"><X size={16} /></button>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
                <div><label className={fieldLabel}>Product title *</label><input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className={inputBase} /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className={fieldLabel}>Price (₹)</label><input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: Number(e.target.value) }))} className={inputBase} /></div>
                  <div><label className={fieldLabel}>Original price</label><input type="number" value={form.originalPrice} onChange={e => setForm(f => ({ ...f, originalPrice: Number(e.target.value) }))} className={inputBase} /></div>
                </div>
                <div><label className={fieldLabel}>Description *</label><textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} className={`${inputBase} resize-none`} /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className={fieldLabel}>Category</label><select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className={inputBase}>{CATS.map(c => <option key={c}>{c}</option>)}</select></div>
                  <div><label className={fieldLabel}>Stock</label><input type="number" value={form.stock} onChange={e => setForm(f => ({ ...f, stock: Number(e.target.value) }))} className={inputBase} /></div>
                </div>
                <div><label className={fieldLabel}>Image filename</label><input value={form.images?.[0] || ''} onChange={e => setForm(f => ({ ...f, images: [e.target.value] }))} className={`${inputBase} font-mono`} /></div>
                <div className="flex items-center gap-2"><input type="checkbox" id="featured" checked={form.isFeatured} onChange={e => setForm(f => ({ ...f, isFeatured: e.target.checked }))} className="accent-zinc-100" /><label htmlFor="featured" className="text-xs text-zinc-300">Featured product</label></div>
              </div>
              <div className="flex gap-2.5 px-6 py-4 border-t border-zinc-800 bg-zinc-950/50">
                <button onClick={closeModal} className="flex-1 rounded-lg border border-zinc-700 bg-transparent px-4 py-2 text-xs font-medium text-zinc-300 hover:bg-zinc-800">Cancel</button>
                <button onClick={handleSave} disabled={saving} className="flex-1 rounded-lg bg-zinc-100 px-4 py-2 text-xs font-medium text-zinc-900 hover:bg-zinc-200 disabled:opacity-50">{saving ? 'Saving…' : editing ? 'Update' : 'Create'}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;