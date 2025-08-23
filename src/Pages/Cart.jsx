// src/Pages/Cart.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../Component/CartContext"; // keep your path
import BgImg from "../assets/CartBg.png";              // NEW: reuse your menu bg (adjust path if different)

const formatCurrency = (n) => `$${n.toFixed(2)}`;

export default function Cart() {
  const { items, count, subtotal, setQty, removeItem, clear } = useCart();

  return (
    <div className="min-h-screen pt-28 relative">
      {/* Background image */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `url(${BgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Readability overlay */}
      <div className="absolute inset-0 -z-10 bg-white/50" />

      {/* Page content */}
      <div className="mx-auto max-w-6xl px-4 pb-24">
        <h1
  className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight
             bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-500
             bg-clip-text text-transparent [text-shadow:0_1px_1px_rgba(16,185,129,0.25)]"
>
  Your Cart
</h1>


        {items.length === 0 ? (
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
            {/* Left: Items */}
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

                        {/* Line total */}
                        <div className="text-right">
                          <div className="font-semibold text-emerald-700">
                            {formatCurrency((i.price || 0) * (i.qty || 0))}
                          </div>
                        </div>
                      </div>

                      {/* Qty controls */}
                      <div className="mt-3 flex items-center gap-2">
                        <button
                          className="h-8 w-8 grid place-items-center rounded-lg border hover:bg-slate-50"
                          onClick={() => setQty(i.id, Math.max(1, (i.qty || 0) - 1))}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          min={1}
                          value={i.qty}
                          onChange={(e) => {
                            const v = parseInt(e.target.value, 10);
                            setQty(i.id, Number.isNaN(v) || v < 1 ? 1 : v);
                          }}
                          className="h-8 w-14 rounded-lg border text-center"
                          aria-label="Quantity"
                        />
                        <button
                          className="h-8 w-8 grid place-items-center rounded-lg border hover:bg-slate-50"
                          onClick={() => setQty(i.id, (i.qty || 0) + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>

                        <button
                          className="ml-3 text-sm text-emerald-700 hover:underline"
                          onClick={() => removeItem(i.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap items-center  justify-between gap-3">
                <Link
                  to="/menu"
                  className="inline-flex items-center rounded-lg border bg-gray-800 px-3 py-2 text-sm text-white hover:bg-gray-500"
                >
                  ← Continue shopping
                </Link>
                <button
                  className="inline-flex items-center rounded-lg bg-red-500 border px-3 py-2 text-sm text-white hover:bg-red-900"
                  onClick={clear}
                >
                  Clear cart
                </button>
              </div>
            </div>

            {/* Right: Summary */}
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
                  <div className="flex items-center justify-between">
                    <dt>Items</dt>
                    <dd className="text-slate-900">{count}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt>Subtotal</dt>
                    <dd className="font-medium text-slate-900">{formatCurrency(subtotal)}</dd>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <dt>Delivery</dt>
                    <dd>$1</dd>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <dt>Tax</dt>
                    <dd>Calculated at checkout</dd>
                  </div>
                </dl>

                <button
                  className="mt-5 w-full rounded-lg bg-emerald-600 py-2.5 text-white font-medium hover:bg-emerald-700"
                  onClick={() => alert("Checkout flow not implemented yet.")}
                >
                  Checkout
                </button>
                <p className="mt-2 text-xs text-slate-500">
                  By placing your order you agree to our Terms & Privacy Policy.
                </p>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
