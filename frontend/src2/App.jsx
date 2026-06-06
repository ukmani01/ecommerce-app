import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import PageLoader from './components/PageLoader';

const Home          = lazy(() => import('./pages/Home'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart          = lazy(() => import('./pages/Cart'));
const Checkout      = lazy(() => import('./pages/Checkout'));
const Orders        = lazy(() => import('./pages/Orders'));
const Admin         = lazy(() => import('./pages/Admin'));

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

const AdminRoute = ({ children }) => {
  const user = (() => { try { return JSON.parse(localStorage.getItem('user') || '{}'); } catch { return {}; } })();
  return user.role === 'admin' ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: { background: '#1a1509', color: '#faf9f6', fontSize: '14px', fontFamily: 'Outfit, sans-serif', borderRadius: '10px', padding: '12px 16px' },
            success: { iconTheme: { primary: '#f97316', secondary: '#faf9f6' } },
          }}
        />
        <Routes>
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Layout />}>
            <Route index           element={<Suspense fallback={<PageLoader />}><Home /></Suspense>} />
            <Route path="product/:id" element={<Suspense fallback={<PageLoader />}><ProductDetail /></Suspense>} />
            <Route path="cart"     element={<PrivateRoute><Suspense fallback={<PageLoader />}><Cart /></Suspense></PrivateRoute>} />
            <Route path="checkout" element={<PrivateRoute><Suspense fallback={<PageLoader />}><Checkout /></Suspense></PrivateRoute>} />
            <Route path="orders"   element={<PrivateRoute><Suspense fallback={<PageLoader />}><Orders /></Suspense></PrivateRoute>} />
            <Route path="admin"    element={<AdminRoute><Suspense fallback={<PageLoader />}><Admin /></Suspense></AdminRoute>} />
          </Route>
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;