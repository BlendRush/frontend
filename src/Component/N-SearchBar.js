import React from "react";
import Dropdown from "../Component/Dropdown";
import { useCart } from "../Component/CartContext";

export default function NavBar({ search = "", onSearchChange }) {
  const { count } = useCart(); // <— live total qty

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 flex items-center justify-between rounded-3xl border border-white/30 bg-white/40 px-5 py-3 backdrop-blur-md shadow-sm">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <span className="inline-grid place-items-center h-9 w-9 rounded-xl bg-emerald-500 text-white font-black">bR</span>
            <div className="leading-tight">
              <div className="text-base font-extrabold tracking-tight text-emerald-600">
                blend<span className="text-slate-800">RUSH</span>
              </div>
            </div>
          </a>

          {/* Links */}
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a className="text-slate-700 hover:text-slate-900" href="#home">Home</a>
            <a className="text-slate-700 hover:text-slate-900" href="#menu">Menu</a>
            <Dropdown label="Blog" items={[
              { label: "Latest", href: "#" },
              { label: "Recipes", href: "#" },
              { label: "Wellness", href: "#" },
            ]}/>
            <a className="text-slate-700 hover:text-slate-900" href="#about">About</a>
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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                     className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                     fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-3.6-3.6" />
                </svg>
              </div>
            </div>

            {/* Cart button */}
            <a
              href="/cart"
              className="relative grid place-items-center rounded-xl border border-white/30 bg-white/60 p-2 hover:bg-white/80 transition"
              aria-label={`Cart${count ? `, ${count} item${count > 1 ? "s" : ""}` : ""}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-700"
                   viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
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
            </a>
          </div>
        </div>

        {/* Mobile search (unchanged) */}
        <div className="md:hidden mt-3 px-1">
          <div className="relative">
            <input
              value={search}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder="Search smoothies, ingredients…"
              className="w-full rounded-xl border border-gray-300 bg-white pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                 fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-3.6-3.6" />
            </svg>
          </div>
        </div>
      </nav>
    </header>
  );
}
