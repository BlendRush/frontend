// src/Pages/HomePage.jsx
import React from "react";
import NavBar from "../Component/NavBar";
import homeBg from "../assets/home-bg.png";

export default function HomePage() {
  return (
    <>
      <NavBar />

      {/* Background section */}
      <div
        className="relative  min-h-screen bg-cover bg-center flex items-center justify-start"
        style={{ backgroundImage: `url(${homeBg})` }}
      >
        {/* Optional overlay */}
        <div className="absolute inset-0 bg-white/20" aria-hidden="true" />

        {/* Content */}
        <div className="relative max-w-xl z-10 text-left ml-32 -translate-y-20">
          <h1
            className="text-4xl md:text-5xl font-bold text-green-900 hover:animate-bounce hover:drop-shadow-[0_0_10px_#22c55e]"
            style={{ fontFamily: "Merienda, cursive" }}
          >
            Welcome to blendRUSH
          </h1>

          <p
            className="mt-4 text-green-800 text-lg"
            style={{ fontFamily: "Merienda, cursive" }}
          >
            
            BlendRush is your neighborhood juice bar for fresh, made-to-order 
            blends. We press real fruit and veggies—no syrups, no fuss—so you 
            get crisp flavors, clean energy, and feel-good sips every time. 
            Grab a post-workout refuel, a midday pick-me-up, or a cleanse pack 
            for the week. Fast service, recyclable cups, and a team that knows 
            your go-to—because better choices should be easy and delicious.
          </p>

          {/* Order Now Button */}
          <button
            className="mt-6 px-6 py-3 rounded-full bg-green-700 text-white font-semibold text-lg shadow-md hover:bg-green-400 transition"
            style={{ fontFamily: "Merienda, cursive" }}
          >
            Order Now
          </button>
        </div>
      </div>
    </>
  );
}
