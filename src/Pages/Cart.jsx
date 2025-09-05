import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BgImg from "../assets/CartBg.png";
import { getLocalStoragedata } from "../helpers/Storage.js"; 
import { placeOrderService } from "../services/orderService";

const formatCurrency = (n) => `$${n.toFixed(2)}`;
const DELIVERY_FEE = 1;
const TAX_RATE = 0;

export default function Cart() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false); // Confirmation modal
  const navigate = useNavigate();
  const serviceURL = process.env.REACT_APP_API_URL;

  const fetchCart = async () => {
    setLoading(true);
    try {
      const token = getLocalStoragedata("token");
      const res = await fetch(`${serviceURL}carts/cart-items`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setItems(data);
      else console.error(data.message);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Update quantity
  const setQty = async (itemId, quantity) => {
    try {
      const token = getLocalStoragedata("token");
      await fetch(`${serviceURL}carts/cart-items/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity }),
      });
      setItems((prev) =>
        prev.map((i) => (i.itemId === itemId ? { ...i, quantity } : i))
      );
    } catch (error) {
      console.error(error);
    }
  };

  // Remove item
  const removeItem = async (itemId) => {
    try {
      const token = getLocalStoragedata("token");
      await fetch(`${serviceURL}carts/cart-items/${itemId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems((prev) => prev.filter((i) => i.itemId !== itemId));
    } catch (error) {
      console.error(error);
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
      const token = getLocalStoragedata("token");
      await fetch(`${serviceURL}carts/cart-items/`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems([]);
    } catch (error) {
      console.error(error);
    }
  };

  // Place order
  const placeOrder = async () => {
    if (!items.length) return;

    const subtotal = items.reduce(
      (sum, i) => sum + (Number(i.price) || 0) * (Number(i.quantity) || 1),
      0
    );
    const tax = subtotal * TAX_RATE;
    const totalAmount = subtotal + DELIVERY_FEE + tax;

    const sanitizedItems = items.map((i) => ({
      itemId: Number(i.itemId),
      name: i.name,
      price: Number(i.price),
      quantity: Number(i.quantity),
      image: i.image || "",
    }));

    try {
      const userID = getLocalStoragedata("userID");

      const orderData = {
        userID,
        items: sanitizedItems,
        subtotal,
        delivery: 1,
        tax,
        totalAmount,
      };

      console.log("orderData", orderData);
      const res = await placeOrderService(orderData);
      console.log("Order Response:", res);

      setItems([]);
      clearCart();
      navigate("/orders");
    } catch (error) {
      console.error("Place order failed:", error.message);
    }
  };

  const count = items.reduce((sum, i) => sum + (i.quantity || 1), 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * (i.quantity || 1), 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + DELIVERY_FEE + tax;

  return (
    <div className="min-h-screen pt-28 relative">
      {/* Background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `url(${BgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-white/50" />

      <div className="mx-auto max-w-6xl px-4 pb-24">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight
                       bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-500
                       bg-clip-text text-transparent [text-shadow:0_1px_1px_rgba(16,185,129,0.25)]">
          Your Cart
        </h1>

        {loading ? (
          <div className="mt-6 text-center">Loading...</div>
        ) : items.length === 0 ? (
          <div className="mt-6 mx-auto max-w-3xl">
            <div className="rounded-xl border bg-green-200 p-6 text-center">
              <p className="text-slate-600">Your cart is empty.</p>
              <Link
                to="/menu"
                className="mt-4 inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-white font-medium hover:bg-emerald-700"
              >
                Browse the menu
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <ul className="divide-y divide-slate-200 rounded-xl border bg-white">
                {items.map((i) => (
                  <li key={i.id} className="p-4 flex items-center gap-4">
                    <img
                      src={i.image}
                      alt={i.name}
                      className="w-16 h-16 rounded-lg object-cover ring-1 ring-slate-200"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="font-medium text-slate-900 truncate">{i.name}</h3>
                          <div className="text-sm text-slate-600">{formatCurrency(i.price)} each</div>
                        </div>
                        <div className="text-right font-semibold text-emerald-700">
                          {formatCurrency((i.price || 0) * (i.quantity || 0))}
                        </div>
                      </div>

                      <div className="mt-3 flex items-center gap-2">
                        <button
                          className="h-8 w-8 grid place-items-center rounded-lg border hover:bg-slate-50"
                          onClick={() => setQty(i.itemId, Math.max(1, (i.quantity || 0) - 1))}
                        >
                          −
                        </button>
                        <input
                          type="number"
                          min={1}
                          value={i.quantity}
                          onChange={(e) => {
                            const v = parseInt(e.target.value, 10);
                            setQty(i.id, Number.isNaN(v) || v < 1 ? 1 : v);
                          }}
                          className="h-8 w-14 rounded-lg border text-center"
                        />
                        <button
                          className="h-8 w-8 grid place-items-center rounded-lg border hover:bg-slate-50"
                          onClick={() => setQty(i.itemId, (i.quantity || 0) + 1)}
                        >
                          +
                        </button>
                        <button
                          className="ml-3 text-sm text-emerald-700 hover:underline"
                          onClick={() => removeItem(i.itemId)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <Link
                  to="/menu"
                  className="inline-flex items-center rounded-lg border bg-gray-800 px-3 py-2 text-sm text-white hover:bg-gray-500"
                >
                  ← Continue shopping
                </Link>
                <button
                  className="inline-flex items-center rounded-lg bg-red-500 border px-3 py-2 text-sm text-white hover:bg-red-900"
                  onClick={clearCart}
                >
                  Clear cart
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <aside className="lg:col-span-1">
              <div className="rounded-xl border bg-gray-100 p-5">
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 6h15l-1.5 9h-12z" />
                    <path d="M6 6l-1-3H2" />
                  </svg>
                  <span>Order Summary</span>
                </h2>

                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center justify-between"><dt>Items</dt><dd className="text-slate-900">{count}</dd></div>
                  <div className="flex items-center justify-between"><dt>Subtotal</dt><dd className="font-medium text-slate-900">{formatCurrency(subtotal)}</dd></div>
                  <div className="flex items-center justify-between text-slate-700"><dt>Delivery</dt><dd>{formatCurrency(DELIVERY_FEE)}</dd></div>
                  <div className="flex items-center justify-between text-slate-600"><dt>Tax</dt><dd>{TAX_RATE ? formatCurrency(tax) : "Calculated at checkout"}</dd></div>
                  <div className="border-t pt-3 mt-3 flex items-center justify-between text-base">
                    <dt className="font-bold text-slate-900">Total</dt>
                    <dd className="font-bold text-slate-900">{formatCurrency(total)}</dd>
                  </div>
                </dl>

                <button
                  className="mt-5 w-full rounded-lg bg-emerald-600 py-2.5 text-white font-medium hover:bg-emerald-700"
                  onClick={() => setShowConfirm(true)}
                >
                  Place Order
                </button>
                <p className="mt-2 text-xs text-slate-500">
                  By placing your order you agree to our Terms & Privacy Policy.
                </p>
              </div>
            </aside>
          </div>
        )}

        {/* Confirmation Modal */}
        {showConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-xl p-6 max-w-sm w-full text-center">
              <h2 className="text-lg font-bold mb-4">Confirm Your Order</h2>
              <p className="mb-6">Are you sure you want to place this order?</p>
              <div className="flex justify-between gap-4">
                <button
                  className="flex-1 rounded-lg bg-gray-300 py-2 font-medium hover:bg-gray-400"
                  onClick={() => setShowConfirm(false)}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 rounded-lg bg-emerald-600 py-2 text-white font-medium hover:bg-emerald-700"
                  onClick={() => {
                    placeOrder();
                    setShowConfirm(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
