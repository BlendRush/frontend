import React from "react";
import Dropdown from "../Component/Dropdown";
import Button from "../Component/Button";

export default function NavBar() {
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
                blend
                <span className="text-slate-800">RUSH</span>
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

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button as="a" href="/sign-in" className="text-sm bg-emerald-600/70 text-slate-800 hover:bg-emerald-600">
              Login
            </Button>
            <Button as="a" href="/register" className="text-sm bg-emerald-500 text-white hover:bg-emerald-600">
              Sign Up
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}
