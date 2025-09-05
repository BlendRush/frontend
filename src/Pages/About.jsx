import { Link } from "react-router-dom";
import AboutBg from "../assets/AboutBg.png";
import NavSearchBar from "../Component/N-SearchBar.js";
import { useState } from "react";

export default function About() {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen pt-28 relative">
      {/* Background image */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `url(${AboutBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Soft overlay for readability */}
      <div className="absolute inset-0 -z-10 bg-white/70 backdrop-blur-[1px]" />

      <NavSearchBar search={search} onSearchChange={(v) => setSearch(v)} />

      {/* Main content */}
      <main className="mx-auto max-w-3xl px-4 pb-16">
        <h1
          className="text-center text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight
                     bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-500
                     bg-clip-text text-transparent"
        >
          About blendRUSH
        </h1>

        <p className="mt-10 text-slate-700">
          blendRUSH is a small, quality-obsessed juice bar focused on fresh
          smoothies, cold-pressed juices, and nourishing bowls. We keep it
          simple: real fruit, real flavor, blended to order-fast.
        </p>

        <p className="mt-3 text-slate-700">
          Our menu is built around seasonal produce, balanced recipes, and
          feel-good nutrition. Whether you’re post-workout, mid-study, or on the
          go, we’ve got a cup that matches your vibe.
        </p>

        <h2 className="mt-6 text-xl font-bold text-slate-900">
          What we stand for
        </h2>
        <ul className="mt-2 list-disc pl-5 text-slate-700 space-y-1">
          <li>100% natural ingredients-whole fruit and greens</li>
          <li>No added sugar or syrups; sweetness comes from fruit</li>
          <li>Made-to-order for peak freshness and flavor</li>
          <li>Eco-conscious packaging where possible</li>
        </ul>

        <h2 className="mt-6 text-xl font-bold text-slate-900">
          Sourcing & sustainability
        </h2>
        <p className="mt-2 text-slate-700">
          We prioritize local markets and seasonal produce when possible, reduce
          waste with smart prep, and use recyclable/compostable cups where
          facilities exist.
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-xl border bg-white p-4">
          <div>
            <h3 className="font-semibold text-slate-900">Hours</h3>
            <p className="text-slate-700 text-sm mt-1">
              Mon–Fri: 8:00–18:00
              <br />
              Sat–Sun: 9:00–17:00
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Contact</h3>
            <p className="text-slate-700 text-sm mt-1">
              hello@blendrush.example
              <br />
              +94 71 234 5678
            </p>
          </div>
        </div>

        <div className="mt-8">
          <Link
            to="/menu"
            className="inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-white font-medium hover:bg-emerald-700"
          >
            Browse Menu
          </Link>
        </div>
      </main>

      {/* Simple footer */}
      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="inline-grid place-items-center h-9 w-9 rounded-xl bg-emerald-500 text-white font-black">
                bR
              </span>
              <div className="leading-tight">
                <div className="text-base font-extrabold tracking-tight text-emerald-600">
                  blend<span className="text-slate-800">RUSH</span>
                </div>
                <p className="text-xs text-slate-500">
                  Fresh. Fast. Fruit-first.
                </p>
              </div>
            </div>

            <nav className="text-sm text-slate-700 flex flex-wrap gap-4">
              <Link className="hover:text-slate-900" to="">
                Home
              </Link>
              <Link className="hover:text-slate-900" to="/menu">
                Menu
              </Link>
              <Link className="hover:text-slate-900" to="/orders">
                Orders
              </Link>
              <Link className="hover:text-slate-900" to="/about">
                About
              </Link>
            </nav>

            <div className="text-sm text-slate-600">
              <div>hello@blendrush.example</div>
              <div>+94 71 234 5678</div>
            </div>
          </div>

          <div className="mt-6 text-xs text-slate-500 text-center sm:text-left">
            © {new Date().getFullYear()} blendRUSH. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
