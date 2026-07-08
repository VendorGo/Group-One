import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { cartService } from '../services/cartService';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // CartContext centralizes cart API calls so item cards, cart page, and
  // checkout page always use the same source of truth.
  const loadCart = async () => {
    if (!user || user.role !== 'customer') {
      setItems([]);
      return;
    }

    setLoading(true);
    try {
      const response = await cartService.getCart();
      setItems(response.data.items);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, [user?.id]);

  const addToCart = async (itemId, quantity = 1) => {
    await cartService.addItem(itemId, quantity);
    await loadCart();
  };

  const updateQuantity = async (cartItemId, quantity) => {
    await cartService.updateItem(cartItemId, quantity);
    await loadCart();
  };

  const removeItem = async (cartItemId) => {
    await cartService.deleteItem(cartItemId);
    await loadCart();
  };

  const clearCart = async () => {
    await cartService.clearCart();
    await loadCart();
  };

  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
  }, [items]);

  return (
    <CartContext.Provider value={{ items, loading, total, loadCart, addToCart, updateQuantity, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
