import React from "react";
import Dropdown from "../Component/Dropdown";

export default function NavBar({ search = "", onSearchChange }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 flex items-center justify-between rounded-3xl border border-white/30 bg-white/40 px-5 py-3 backdrop-blur-md shadow-sm">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <span className="inline-grid place-items-center h-9 w-9 rounded-xl bg-emerald-500 text-white font-black">
              bR
            </span>
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
            <Dropdown
              label="Blog"
              items={[
                { label: "Latest", href: "#" },
                { label: "Recipes", href: "#" },
                { label: "Wellness", href: "#" },
              ]}
            />
            <a className="text-slate-700 hover:text-slate-900" href="#about">About</a>
          </div>

          {/* Search (replaces Login/Sign Up) */}
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
