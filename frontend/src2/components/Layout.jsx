import React, { useState, useRef, useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  ShoppingBag,
  User,
  Search,
  Menu,
  X,
  ChevronDown,
  Package,
  LogOut,
  LayoutDashboard,
  Heart
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [mobileNav, setMobileNav] = useState(false);

  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const userRef = useRef(null);

  useEffect(() => {
    setUserMenu(false);
    setMobileNav(false);
  }, [location.pathname]);

  useEffect(() => {
    const handler = (e) => {
      if (userRef.current && !userRef.current.contains(e.target)) {
        setUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/?search=${encodeURIComponent(searchVal.trim())}`);
      setSearchOpen(false);
      setSearchVal('');
    }
  };

  const navLinks = [
    { label: 'Men', to: '/?category=Men' },
    { label: 'Women', to: '/?category=Women' },
    { label: 'Kids', to: '/?category=Kids' },
    { label: 'Footwear', to: '/?category=Footwear' },
    { label: 'Accessories', to: '/?category=Accessories' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">

      {/* TOP STRIP */}
      <div className="bg-neutral-900 text-neutral-200 text-xs py-2 text-center tracking-wide">
        Free shipping above ₹999 · Easy returns · Secure checkout
      </div>

      {/* HEADER */}
      <header className="bg-white border-b border-neutral-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">

            {/* LOGO */}
            <Link to="/" className="text-2xl font-semibold text-neutral-900">
              Drape
            </Link>

            {/* DESKTOP NAV - WITH SUPER ANIMATION */}
            <nav className="hidden lg:flex gap-1">
              {navLinks.map(({ label, to }, idx) => (
                <Link
                  key={label}
                  to={to}
                  className="
                    px-4 py-2 text-sm font-medium text-neutral-600 
                    hover:text-neutral-900 hover:bg-neutral-50 
                    rounded-xl transition-all duration-300 ease-out
                    transform hover:-translate-y-0.5 hover:scale-105
                    relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 
                    after:h-0.5 after:w-0 after:bg-neutral-900 
                    after:transition-all after:duration-300
                    hover:after:w-full
                    animate-in fade-in slide-in-from-bottom-2
                  "
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* RIGHT ACTIONS */}
            <div className="flex items-center gap-2">

              {/* SEARCH */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-xl hover:bg-neutral-100 transition"
              >
                <Search size={18} />
              </button>

              {/* WISHLIST */}
              <button className="p-2 rounded-xl hover:bg-neutral-100 transition hidden sm:flex">
                <Heart size={18} />
              </button>

              {/* CART */}
              <Link to="/cart" className="relative p-2 rounded-xl hover:bg-neutral-100 transition">
                <ShoppingBag size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Link>

              {/* USER */}
              {user ? (
                <div className="relative" ref={userRef}>
                  <button
                    onClick={() => setUserMenu(!userMenu)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-neutral-100 transition"
                  >
                    <div className="w-7 h-7 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-bold">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <ChevronDown size={14} />
                  </button>

                  {/* USER DROPDOWN */}
                  {userMenu && (
                    <div className="absolute right-0 top-full mt-2 w-60 bg-white border border-neutral-100 rounded-2xl shadow-lg overflow-hidden">
                      <div className="p-4 border-b">
                        <p className="font-medium text-sm">{user.name}</p>
                        <p className="text-xs text-neutral-500">{user.email}</p>
                      </div>

                      <Link
                        to="/orders"
                        className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-neutral-50"
                      >
                        <Package size={15} /> My Orders
                      </Link>

                      {user.role === 'admin' && (
                        <Link
                          to="/admin"
                          className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-neutral-50"
                        >
                          <LayoutDashboard size={15} /> Admin
                        </Link>
                      )}

                      <button
                        onClick={logout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut size={15} /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 bg-black text-white text-sm rounded-xl transition-transform duration-300 hover:scale-105"
                >
                  Sign In
                </Link>
              )}

              {/* MOBILE MENU BUTTON */}
              <button
                onClick={() => setMobileNav(true)}
                className="lg:hidden p-2 rounded-xl hover:bg-neutral-100"
              >
                <Menu size={18} />
              </button>
            </div>
          </div>

          {/* SEARCH BAR */}
          {searchOpen && (
            <div className="py-3">
              <form onSubmit={handleSearch} className="flex gap-2">
                <input
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 px-4 py-2 border rounded-xl"
                />
                <button className="px-4 py-2 bg-black text-white rounded-xl">
                  Search
                </button>
              </form>
            </div>
          )}
        </div>
      </header>

      {/* FULL SCREEN MOBILE NAV (LEFT SLIDE OVERLAY) */}
      {mobileNav && (
        <div className="fixed inset-0 z-[100] flex">

          {/* BACKDROP */}
          <div
            className="flex-1 bg-black/40"
            onClick={() => setMobileNav(false)}
          />

          {/* SIDE PANEL - enhanced animation for menu items */}
          <div className="w-full sm:w-[420px] bg-white h-full p-6 flex flex-col animate-in slide-in-from-right duration-500">

            {/* HEADER */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-semibold animate-in fade-in duration-700">Menu</h2>
              <button onClick={() => setMobileNav(false)} className="hover:rotate-90 transition-transform duration-300">
                <X size={22} />
              </button>
            </div>

            {/* NAV LINKS BIG - STAGGERED ENTRY */}
            <div className="flex flex-col gap-2">
              {navLinks.map(({ label, to }, idx) => (
                <Link
                  key={label}
                  to={to}
                  onClick={() => setMobileNav(false)}
                  className="text-2xl font-semibold py-3 px-3 rounded-xl hover:bg-neutral-100 transition-all duration-300 transform hover:translate-x-1 animate-in fade-in slide-in-from-left-4"
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* ACCOUNT ACTIONS */}
            <div className="mt-auto border-t pt-6 flex flex-col gap-2">

              <Link
                to="/orders"
                onClick={() => setMobileNav(false)}
                className="text-xl font-medium py-3 px-3 rounded-xl hover:bg-neutral-100 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2"
                style={{ animationDelay: '200ms' }}
              >
                My Orders
              </Link>

              {user?.role === 'admin' && (
                <Link
                  to="/admin"
                  onClick={() => setMobileNav(false)}
                  className="text-xl font-medium py-3 px-3 rounded-xl hover:bg-neutral-100 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2"
                  style={{ animationDelay: '250ms' }}
                >
                  Admin Panel
                </Link>
              )}

              {user && (
                <button
                  onClick={() => {
                    logout();
                    setMobileNav(false);
                  }}
                  className="text-xl font-medium py-3 px-3 rounded-xl text-red-600 hover:bg-red-50 text-left transition-all duration-300 animate-in fade-in slide-in-from-bottom-2"
                  style={{ animationDelay: '300ms' }}
                >
                  Sign Out
                </button>
              )}

              {!user && (
                <Link
                  to="/login"
                  onClick={() => setMobileNav(false)}
                  className="text-xl font-medium py-3 px-3 rounded-xl bg-black text-white text-center transition-transform duration-300 hover:scale-105 animate-in fade-in slide-in-from-bottom-2"
                  style={{ animationDelay: '300ms' }}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MAIN */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer - Enhanced readability with larger text and better colors */}
      <footer className="bg-white border-t border-ink-100 mt-24">
        <div className="max-w-[1400px] mx-auto px-6 pt-20 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 mb-20">
            <div className="md:col-span-5 lg:col-span-4">
              <Link to="/" className="inline-block mb-6">
                <span className="font-display text-3xl text-ink-900 italic tracking-tight">Drape</span>
              </Link>
              <p className="text-base text-ink-700 leading-relaxed max-w-sm font-normal">
                Defining the new era of modern luxury. Curated collections for the discerning individual, delivered with uncompromising precision.
              </p>
            </div>
            <div className="md:col-span-7 lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-12">
              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] text-ink-800 font-bold mb-6">Collections</h4>
                <ul className="space-y-4">
                  {['Men', 'Women', 'Kids', 'Footwear', 'Accessories'].map(c => (
                    <li key={c}>
                      <Link to={`/?category=${c}`} className="text-base text-ink-700 hover:text-ink-900 transition-colors duration-300 font-medium">
                        {c}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] text-ink-800 font-bold mb-6">Support</h4>
                <ul className="space-y-4">
                  {['Track Order', 'Returns', 'Size Guide', 'Contact'].map(i => (
                    <li key={i}>
                      <span className="cursor-pointer text-base text-ink-700 hover:text-ink-900 transition-colors duration-300 font-medium">
                        {i}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <h4 className="text-xs uppercase tracking-[0.2em] text-ink-800 font-bold mb-6">Journal</h4>
                <p className="text-base text-ink-700 font-normal leading-relaxed">
                  Stay informed on new arrivals and seasonal stories.
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-ink-100 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <p className="text-xs uppercase tracking-widest text-ink-600 font-semibold">
              © 2026 Drape Studio. All rights reserved.
            </p>
            <div className="flex gap-8">
              {['Privacy', 'Terms', 'Shipping'].map((item) => (
                <span key={item} className="text-xs uppercase tracking-widest text-ink-600 hover:text-ink-900 transition-colors cursor-pointer font-semibold">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;