// src/Pages/Orders.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import OrdersBg from "../assets/OrderBg.png"; // <-- your unique orders bg (change path/name if needed)

const KEY = "orders:v1";
const formatCurrency = (n) => `$${n.toFixed(2)}`;
const fmtDate = (iso) => new Date(iso).toLocaleString();

export default function Orders() {
  const { state } = useLocation();
  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
    try {
      setOrders(JSON.parse(localStorage.getItem(KEY) || "[]"));
    } catch {
      setOrders([]);
    }
  }, []);

  const hasOrders = orders.length > 0;
  const recent = hasOrders
    ? (state?.lastOrderId && orders.find((o) => o.id === state.lastOrderId)) || orders[0]
    : null;
  const history = hasOrders ? orders.filter((o) => o.id !== recent.id) : [];

  return (
    <div className="min-h-screen pt-28 relative">
      {/* Background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `url(${OrdersBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Soft readability overlay */}
      <div className="absolute inset-0 -z-10 bg-white/60" />

      {/* Page content */}
      <div className="mx-auto max-w-6xl px-4 pb-24">
        <div className="flex items-end justify-between gap-3 flex-wrap">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent">
            Orders
          </h1>
          <Link
            to="/menu"
            className="inline-flex items-center rounded-lg border bg-gray-700 px-3 py-2 text-sm text-white hover:bg-gray-500"
          >
            ← Continue shopping
          </Link>
        </div>

        {!hasOrders ? (
          <div className="mt-6 mx-auto max-w-3xl">
            <div className="rounded-xl border bg-white p-6 text-center">
              <p className="text-slate-600">No orders yet.</p>
              <Link
                to="/menu"
                className="mt-4 inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-white font-medium hover:bg-emerald-700"
              >
                Browse the menu
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Recent order */}
            <section className="mt-6 rounded-xl border bg-gray-200 p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
                  Recent Order
                </h2>
                <span className="text-sm text-slate-600">
                  #{recent.id} • {fmtDate(recent.createdAt)}
                </span>
              </div>

              <ul className="mt-4 divide-y divide-slate-200">
                {recent.items.map((i) => (
                  <li key={i.id} className="py-3 flex items-center gap-3">
                    {i.image && (
                      <img
                        src={i.image}
                        alt={i.name}
                        className="w-12 h-12 rounded-lg object-cover ring-1 ring-slate-200"
                      />
                    )}
                    <div className="flex-1">
                      <div className="font-medium text-slate-900">{i.name}</div>
                      <div className="text-sm text-slate-600">
                        ${i.price.toFixed(2)} • Qty {i.qty}
                      </div>
                    </div>
                    <div className="font-semibold text-emerald-700">
                      {formatCurrency((i.price || 0) * (i.qty || 0))}
                    </div>
                  </li>
                ))}
              </ul>

              <dl className="mt-4 grid grid-cols-2 gap-2 text-sm max-w-sm ml-auto">
                <div className="flex items-center justify-between">
                  <dt>Subtotal</dt>
                  <dd>{formatCurrency(recent.subtotal)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt>Delivery</dt>
                  <dd>{formatCurrency(recent.delivery)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt>Tax</dt>
                  <dd>{recent.tax ? formatCurrency(recent.tax) : "—"}</dd>
                </div>
                <div className="col-span-2 border-t pt-2 flex items-center justify-between text-base">
                  <dt className="font-bold text-slate-900">Total</dt>
                  <dd className="font-bold text-slate-900">
                    {formatCurrency(recent.total)}
                  </dd>
                </div>
              </dl>
            </section>

            {/* Order history */}
            {history.length > 0 && (
              <section className="mt-6">
                {/* Upgraded font + accent underline */}
                <div className="space-y-1">
                  <h3
                    style={{ fontFamily: "'Poppins', ui-sans-serif, system-ui" }} // <- custom font
                    className="text-2xl font-extrabold tracking-tight text-slate-900"
                  >
                    Order History
                  </h3>
                  <div className="h-1 w-24 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"></div>
                </div>

                <div className="mt-3 rounded-xl border bg-gray-200 divide-y divide-slate-200">
                  {history.map((o) => (
                    <details key={o.id} className="group p-4">
                      <summary className="flex items-center justify-between cursor-pointer">
                        <div>
                          <span className="font-medium text-slate-900">
                            #{o.id}
                          </span>
                          <span className="ml-2 text-sm text-slate-600">
                            {fmtDate(o.createdAt)}
                          </span>
                        </div>
                        <div className="text-sm font-semibold text-emerald-700">
                          {formatCurrency(o.total)}
                        </div>
                      </summary>
                      <ul className="mt-3 pl-1 space-y-2">
                        {o.items.map((i) => (
                          <li
                            key={i.id}
                            className="flex items-center justify-between text-sm"
                          >
                            <span className="text-slate-700">
                              {i.name} × {i.qty}
                            </span>
                            <span className="text-slate-900">
                              {formatCurrency(i.price * i.qty)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}
