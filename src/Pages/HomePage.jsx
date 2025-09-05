import { useState } from "react";
import NavBar from "../Component/NavBar";
import homeBg from "../assets/home-bg.png";
import NavSearchBar from "../Component/N-SearchBar.js";
import { getLocalStoragedata } from "../helpers/Storage.js";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const token = getLocalStoragedata("token");

  const handleClick = () => {
    if (token) {
      navigate("/menu");
    } else {
      navigate("/sign-in");
    }
  };

  return (
    <>
      {token ? (
        <NavSearchBar search={search} onSearchChange={(v) => setSearch(v)} />
      ) : (
        <NavBar />
      )}

      {/* Background section */}
      <div
        className="relative min-h-screen bg-cover bg-center flex items-center justify-center md:justify-start"
        style={{ backgroundImage: `url(${homeBg})` }}
      >
        {/* Optional overlay */}
        <div className="absolute inset-0 bg-white/20" aria-hidden="true" />

        {/* Content */}
        <div className="relative z-10 max-w-2xl text-center md:text-left px-6 sm:px-10 md:ml-16 lg:ml-32 -translate-y-10 md:-translate-y-30">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-900 hover:animate-bounce hover:drop-shadow-[0_0_10px_#22c55e]"
            style={{ fontFamily: "Merienda, cursive" }}
          >
            Welcome to blendRUSH
          </h1>

          <p
            className="mt-4 text-green-800 text-base sm:text-lg leading-relaxed"
            style={{ fontFamily: "Merienda, cursive" }}
          >
            BlendRush is your neighborhood juice bar for fresh, made-to-order
            blends. We press real fruit and veggies-no syrups, no fuss-so you
            get crisp flavors, clean energy, and feel-good sips every time. Grab
            a post-workout refuel, a midday pick-me-up, or a cleanse pack for
            the week. Fast service, recyclable cups, and a team that knows your
            go-to-because better choices should be easy and delicious.
          </p>

          {/* Order Now Button */}
          <button
            onClick={handleClick}
            className="mt-6 px-6 py-3 rounded-full bg-green-700 text-white font-semibold text-base sm:text-lg shadow-md hover:bg-green-400 transition"
            style={{ fontFamily: "Merienda, cursive" }}
          >
            {!token ? "Order Now" : "Continue Shopping"}
          </button>
        </div>
      </div>
    </>
  );
}
