import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const CartContext = createContext(undefined);
const initialState = { items: [] }; // each item: { id, name, price, image, qty }

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const { item, qty = 1 } = action;
      const i = state.items.findIndex((x) => x.id === item.id);
      const items = i >= 0
        ? state.items.map((x) => x.id === item.id ? { ...x, qty: (x.qty || 0) + qty } : x)
        : [...state.items, { ...item, qty }];
      return { ...state, items };
    }
    case "SET_QTY": {
      const { id, qty } = action;
      const items = state.items
        .map((x) => (x.id === id ? { ...x, qty } : x))
        .filter((x) => (x.qty || 0) > 0);
      return { ...state, items };
    }
    case "REMOVE":
      return { ...state, items: state.items.filter((x) => x.id !== action.id) };
    case "CLEAR":
      return initialState;
    default:
      return state;
  }
}

export function CartProvider({ children, storageKey = "cart:v1" }) {
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    (init) => {
      if (typeof window === "undefined") return init;
      try { return JSON.parse(localStorage.getItem(storageKey)) || init; } catch { return init; }
    }
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    try { localStorage.setItem(storageKey, JSON.stringify(state)); } catch {}
  }, [state, storageKey]);

  const value = useMemo(() => {
    const count = state.items.reduce((n, i) => n + (i.qty || 0), 0);
    const subtotal = state.items.reduce((s, i) => s + (i.price || 0) * (i.qty || 0), 0);
    return {
      items: state.items,
      count,
      subtotal,
      addItem: (item, qty = 1) => dispatch({ type: "ADD", item, qty }),
      setQty: (id, qty) => dispatch({ type: "SET_QTY", id, qty }),
      removeItem: (id) => dispatch({ type: "REMOVE", id }),
      clear: () => dispatch({ type: "CLEAR" }),
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
