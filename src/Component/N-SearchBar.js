// src/Component/NavBar.jsx
import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useCart } from "../Component/CartContext";

export default function NavBar({ search = "", onSearchChange }) {
  const { count } = useCart(); // live total qty

  // shared styling for the center nav links
  const navLink = ({ isActive }) =>
    [
      "relative inline-flex items-center gap-2 px-3 py-1 rounded-lg",
      "text-[15px] font-semibold tracking-wide transition-colors",
      isActive
        ? "text-emerald-700 bg-emerald-50 ring-1 ring-emerald-100"
        : "text-slate-700 hover:text-slate-900",
    ].join(" ");

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 flex items-center justify-between rounded-3xl border border-white/30 bg-white/40 px-5 py-3 backdrop-blur-md shadow-sm">
          {/* Logo -> go home */}
          <Link to="/home" className="flex items-center gap-2">
            <span className="inline-grid place-items-center h-9 w-9 rounded-xl bg-emerald-500 text-white font-black">
              bR
            </span>
            <div className="leading-tight">
              <div className="text-base font-extrabold tracking-tight text-emerald-600">
                blend<span className="text-slate-800">RUSH</span>
              </div>
            </div>
          </Link>

          {/* Center links (Blog removed) */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink to="/home" className={navLink}>
              <svg className="h-4 w-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 11.5 12 4l9 7.5" />
                <path d="M5 10v10h14V10" />
              </svg>
              <span>Home</span>
            </NavLink>

            <NavLink to="/menu" className={navLink}>
              <svg className="h-4 w-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
              <span>Menu</span>
            </NavLink>

            {/* If you don't have /about route yet, remove this or add the route */}
            <NavLink to="/about" className={navLink}>
              <svg className="h-4 w-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8v8M12 16h.01" />
              </svg>
              <span>About</span>
            </NavLink>
          </div>

          {/* Search + Cart */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="hidden md:block w-[340px]">
              <div className="relative">
                <input
                  value={search}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  placeholder="Search smoothies, ingredients…"
                  className="w-full rounded-xl border border-gray-300 bg-white pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-3.6-3.6" />
                </svg>
              </div>
            </div>

            {/* Cart button */}
            <Link
              to="/cart"
              className="relative grid place-items-center rounded-xl border border-white/30 bg-white/60 p-2 hover:bg-white/80 transition"
              aria-label={`Cart${count ? `, ${count} item${count > 1 ? "s" : ""}` : ""}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-emerald-700"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M6 6h15l-1.5 9h-12z" />
                <path d="M6 6l-1-3H2" />
                <circle cx="9" cy="20" r="1.6" />
                <circle cx="18" cy="20" r="1.6" />
              </svg>
              {count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-emerald-600 px-1.5 text-[11px] font-bold text-white shadow ring-1 ring-white">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden mt-3 px-1">
          <div className="relative">
            <input
              value={search}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder="Search smoothies, ingredients…"
              className="w-full rounded-xl border border-gray-300 bg-white pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-3.6-3.6" />
            </svg>
          </div>
        </div>
      </nav>
    </header>
  );
}
