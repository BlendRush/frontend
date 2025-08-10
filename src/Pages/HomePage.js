import React from "react";
import NavBar from "../Component/NavBar";
import Button from "../Component/Button";

// Use your new background image (placed in public/assets)
const HERO_BG = "src\assets\Home page bg.png"; // <-- your second image


export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-emerald-50">
      <NavBar />

      {/* HERO */}
      <section id="home" className="relative isolate flex min-h-screen items-center">
        {/* NEW background image */}
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{
            backgroundImage: `url(${HERO_BG})`,
          }}
        />
        {/* (Optional) super-light white wash; delete this div if you want zero overlay */}
        <div className="absolute inset-0 -z-10 bg-white/10" />


        {/* Content */}
        <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 sm:px-8 lg:grid-cols-2">
          <div className="py-28 md:py-40">
            <span className="mb-4 inline-block rounded-full border border-emerald-300/60 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700 backdrop-blur">
              Editorial
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
              A bold, sunny <span className="text-emerald-600">tropical</span> juiceland.
            </h1>
            <p className="mt-5 max-w-xl text-slate-700">
              Fresh-pressed blends with bright citrus, lush pineapple, and just-picked greens.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <Button as="a" href="#order">Call up a tray</Button>
              <a href="#menu" className="inline-flex items-center rounded-2xl px-5 py-3 font-semibold text-emerald-700 hover:text-emerald-800">
                Browse menu
                <svg className="ml-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M7.05 4.55a1 1 0 0 0 0 1.41l4 4-4 4a1 1 0 1 0 1.41 1.41l4.7-4.7a1 1 0 0 0 0-1.41l-4.7-4.7a1 1 0 0 0-1.41 0z" />
                </svg>
              </a>
            </div>

            <div className="mt-10 flex items-center gap-6 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" />
                100% real fruit
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-cyan-500" />
                No added sugar
              </div>
            </div>
          </div>

          {/* Product card stays the same */}
          <div className="relative hidden lg:block">
            <div className="relative mx-auto w-full max-w-md rounded-3xl border border-white/40 bg-white/30 p-6 backdrop-blur-xl shadow-lg">
              <img
                alt="juice glass"
                src="https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=1200&auto=format&fit=crop"
                className="h-96 w-full rounded-2xl object-cover"
              />
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Signature</p>
                  <p className="text-lg font-semibold text-slate-800">Citrus Splash</p>
                </div>
                <Button as="a" href="#order" className="px-4 py-2 text-sm">
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* remove the animated splash rings if you want a totally clean bg */}
        {/* <div className="pointer-events-none absolute inset-0 -z-10 opacity-40 [background:radial-gradient(600px_200px_at_20%_30%,rgba(59,130,246,.15),transparent),radial-gradient(500px_180px_at_80%_70%,rgba(16,185,129,.18),transparent)]" /> */}
      </section>

      <footer className="relative border-t border-white/40 bg-white/50 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row">
          <p className="text-sm text-slate-600">
            © {new Date().getFullYear()} BlendRush. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-sm">
            <a href="#" className="text-slate-600 hover:text-slate-800">Privacy</a>
            <a href="#" className="text-slate-600 hover:text-slate-800">Terms</a>
            <a href="#" className="text-slate-600 hover:text-slate-800">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
