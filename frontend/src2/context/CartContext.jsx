import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import API from '../services/api';
import toast from 'react-hot-toast';

const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);

const initialState = { cart: { items: [], totalAmount: 0, totalItems: 0 }, loading: true };

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET':    return { ...state, cart: action.payload, loading: false };
    case 'UPDATE': return { ...state, cart: action.payload };
    case 'CLEAR':  return { ...state, cart: { items: [], totalAmount: 0, totalItems: 0 } };
    default: return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchCart = useCallback(async () => {
    if (!localStorage.getItem('token')) { dispatch({ type: 'SET', payload: { items: [], totalAmount: 0, totalItems: 0 } }); return; }
    try {
      const { data } = await API.get('/cart');
      dispatch({ type: 'SET', payload: data.cart });
    } catch { dispatch({ type: 'SET', payload: { items: [], totalAmount: 0, totalItems: 0 } }); }
  }, []);

  useEffect(() => { fetchCart(); }, [fetchCart]);

  const addToCart = async (productId, quantity = 1) => {
    if (!localStorage.getItem('token')) { toast.error('Please sign in to add items'); window.location.href = '/login'; return; }
    try {
      const { data } = await API.post('/cart/add', { productId, quantity });
      dispatch({ type: 'UPDATE', payload: data.cart });
      toast.success('Added to bag');
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to add'); }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const { data } = await API.put('/cart/update', { productId, quantity });
      dispatch({ type: 'UPDATE', payload: data.cart });
    } catch { toast.error('Could not update'); }
  };

  const removeItem = async (productId) => {
    try {
      const { data } = await API.delete(`/cart/${productId}`);
      dispatch({ type: 'UPDATE', payload: data.cart });
      toast.success('Removed from bag');
    } catch { toast.error('Could not remove'); }
  };

  return (
    <CartContext.Provider value={{
      cart:         state.cart,
      loading:      state.loading,
      cartCount:    state.cart?.totalItems || 0,
      addToCart,
      updateQuantity,
      removeItem,
      refreshCart:  fetchCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};