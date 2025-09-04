import React, { createContext, useContext, useState, useEffect } from "react";
import { getLocalStoragedata } from "../helpers/Storage";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const fetchCart = async () => {
    try {
      const token = getLocalStoragedata("token");
      const res = await fetch("http://localhost:3000/api/carts/cart-items", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setItems(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const count = items.reduce((sum, i) => sum + (i.quantity || 1), 0);

  return (
    <CartContext.Provider value={{ items, setItems, count, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
