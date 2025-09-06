import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { getLocalStoragedata } from "../helpers/Storage";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const serviceURL = process.env.REACT_APP_API_URL;
  const token = getLocalStoragedata("token");

  const fetchCart = useCallback(async () => {
    try {
      const res = await fetch(`${serviceURL}carts/cart-items`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setItems(data);
    } catch (err) {
      console.error(err);
    }
  }, [serviceURL, token]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const clearCart = useCallback(async () => {
    try {
      const res = await fetch(`${serviceURL}carts/cart-items/`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setItems([]);
    } catch (err) {
      console.error(err);
    }
  }, [serviceURL, token]);

  const count = items.reduce((sum, i) => sum + (i.quantity || 1), 0);

  return (
    <CartContext.Provider value={{ items, setItems, count, fetchCart,clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
