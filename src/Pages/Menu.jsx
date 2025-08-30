import React, { useMemo, useState } from "react";
import NavSearchBar from "../Component/N-SearchBar.js";
import { useCart } from "../Component/CartContext"; // <-- NEW

import AvocadoImg from "../assets/Avacado_S.png";
import BerryImg from "../assets/Berry_S.png";
import PinappleSImg from "../assets/pineapple_s.png";
import OrangeImg from "../assets/Orange_J.png";
import BeetImg from "../assets/Beet_J.png";
import AcaiImg from "../assets/Acai_B.png";
import ChiaImg from "../assets/Chia_B.png";
import GingerImg from "../assets/Ginger_S.png";
import BannerImg from "../assets/Banner.png";
import BgImg from "../assets/MBg.png";

// ---- Sample data -----------------------------------------------------------
const CATEGORIES = ["Smoothies", "Fresh Juices", "Bowls", "Shots"];

const ITEMS = [
  {
    id: "s1",
    name: "Green Glow Elixir",
    category: "Smoothies",
    price: 5.5,
    kcal: 230,
    tags: ["vegan", "no-added-sugar"],
    image: AvocadoImg,
    ingredients: ["Spinach, Avocado, Kiwi, Coconut water, Honey"],
  },
  {
    id: "s2",
    name: "Berry Zen Fusion",
    category: "Smoothies",
    price: 6.0,
    kcal: 210,
    tags: ["vegan", "antioxidant"],
    image: BerryImg,
    ingredients: ["Blueberry", "Strawberry", "Raspberry", "Oat milk", "Chia"],
  },
  {
    id: "s3",
    name: "Golden Sunrise Shake",
    category: "Smoothies",
    price: 6.5,
    kcal: 190,
    tags: ["vegan", "low-sugar"],
    image: PinappleSImg,
    ingredients: ["Mango, Pineapple, Banana, Turmeric, Oat milk"],
  },
  {
    id: "j1",
    name: "Citrus Boost Juice",
    category: "Fresh Juices",
    price: 4.0,
    kcal: 120,
    tags: ["vitamin-c"],
    image: OrangeImg,
    ingredients: ["Fresh orange, Lemon, Ginger, Honey, Water"],
  },
  {
    id: "j2",
    name: "Beet Revive Juice",
    category: "Fresh Juices",
    price: 4.5,
    kcal: 130,
    tags: ["vegan", "detox"],
    image: BeetImg,
    ingredients: ["Beetroot, Carrot, Apple, Lemon, Mint leaves"],
  },
  {
    id: "b1",
    name: "Acai Power Bowl",
    category: "Bowls",
    price: 7.5,
    kcal: 380,
    tags: ["vegan", "protein"],
    image: AcaiImg,
    ingredients: ["Acai", "Granola", "Banana", "Peanut butter", "Cacao nibs"],
  },
  {
    id: "b2",
    name: "Tropical Chia Bowl",
    category: "Bowls",
    price: 7.0,
    kcal: 340,
    tags: ["vegan", "omega-3"],
    image: ChiaImg,
    ingredients: ["Chia", "Coconut milk", "Mango", "Pineapple", "Toasted coconut"],
  },
  {
    id: "sh1",
    name: "Ginger Shot",
    category: "Shots",
    price: 2.0,
    kcal: 25,
    tags: ["detox", "immunity"],
    image: GingerImg,
    ingredients: ["Ginger", "Lemon", "Honey"],
  },
];

const TAG_OPTIONS = [
  { key: "vegan", label: "Vegan" },
  { key: "protein", label: "High Protein" },
  { key: "low-sugar", label: "Low Sugar" },
  { key: "detox", label: "Detox" },
  { key: "vitamin-c", label: "Vitamin C" },
];

// ---- Helpers ---------------------------------------------------------------
const formatCurrency = (n) => `$${n.toFixed(2)}`;

// Simple badge component
const Badge = ({ children, active, onClick }) => (
  <button
    onClick={onClick}
    className={`whitespace-nowrap rounded-full border px-3 py-1 text-sm transition-all ${
      active
        ? "bg-emerald-600 text-white border-emerald-600 shadow"
        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
    }`}
  >
    {children}
  </button>
);

// ---- Main Page -------------------------------------------------------------
export default function MenuPage() {
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [search, setSearch] = useState("");
  const [activeTags, setActiveTags] = useState([]);
  const [sortBy, setSortBy] = useState("popular");
  const [toast, setToast] = useState(null);

  const { addItem } = useCart(); // <-- NEW

  const toggleTag = (key) => {
    setActiveTags((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const filtered = useMemo(() => {
    let list = ITEMS.filter((it) => it.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (it) =>
          it.name.toLowerCase().includes(q) ||
          it.ingredients.join(" ").toLowerCase().includes(q)
      );
    }
    if (activeTags.length) {
      list = list.filter((it) => activeTags.every((t) => it.tags.includes(t)));
    }
    switch (sortBy) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "kcal":
        list = [...list].sort((a, b) => a.kcal - b.kcal);
        break;
      default:
        break;
    }
    return list;
  }, [category, search, activeTags, sortBy]);

  // Add to cart + keep your toast behavior
  const handleAdd = (item) => {
    addItem(
      { id: item.id, name: item.name, price: item.price, image: item.image },
      1
    );
    setToast({ name: item.name });
    setTimeout(() => setToast(null), 1800);
  };

  return (
    <div
      className="min-h-screen pt-28 relative"
      style={{
        backgroundImage: `url(${BgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/80"></div>

      {/* Main content */}
      <div className="relative">
        <NavSearchBar search={search} onSearchChange={(v) => setSearch(v)} />
        <main id="menu" className="mx-auto max-w-6xl px-4 pb-24">
          {/* Hero */}
          <section className="mt-8 rounded-2xl bg-emerald-600/90 text-white p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-semibold">Our Menu</h1>
              <p className="mt-1 text-emerald-50">
                Choose your vibe: green, fruity, protein-packed—it's all here.
              </p>
            </div>
            <img
              alt="Smoothie banner"
              className="h-28 w-48 md:h-36 md:w-96 object-cover rounded-2xl shadow-lg ring-4 ring-white/20"
              src={BannerImg}
            />
          </section>

          {/* Category tabs */}
          <section className="mt-6">
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition-all border ${
                    c === category
                      ? "bg-emerald-600 text-white border-emerald-600 shadow"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </section>

          {/* Filters + sort */}
          <section className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {TAG_OPTIONS.map((t) => (
                <Badge
                  key={t.key}
                  active={activeTags.includes(t.key)}
                  onClick={() => toggleTag(t.key)}
                >
                  {t.label}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Sort by</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="popular">Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="kcal">Calories</option>
              </select>
            </div>
          </section>

          {/* Count */}
          <p className="mt-3 text-sm text-gray-600">
            Showing <span className="font-medium text-gray-900">{filtered.length}</span>{" "}
            item{filtered.length !== 1 ? "s" : ""}
            {activeTags.length ? (
              <> with {activeTags.length} filter{activeTags.length !== 1 ? "s" : ""}</>
            ) : null}
          </p>

          {/* Grid */}
          <section className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((item) => (
              <article
                key={item.id}
                className="group rounded-2xl bg-gray-200 border border-emerald-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-40 w-full object-cover rounded-t-2xl"
                  />
                  <div className="absolute left-2 top-2 flex gap-2">
                    {item.tags.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-white/90 backdrop-blur px-2 py-0.5 text-[11px] font-medium text-emerald-700 border border-emerald-200"
                      >
                        {t.replaceAll("-", " ")}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 ">
                  <h3 className="text-base font-semibold text-gray-900 line-clamp-1">
                    {item.name}
                  </h3>
                  <div className="mt-1 flex items-center justify-between">
                    <p className="text-sm text-gray-500">{item.kcal} kcal</p>
                    <p className="text-emerald-700 font-semibold">
                      {formatCurrency(item.price)}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <button
                      onClick={() => handleAdd(item)} // <-- wired to cart
                      className="rounded-xl bg-emerald-600 text-white px-4 py-2 text-sm font-medium hover:bg-emerald-700 active:scale-[0.99] transition"
                    >
                      Add
                    </button>

                    <details>
                      <summary className="cursor-pointer text-sm text-emerald-700 hover:underline">
                        Ingredients
                      </summary>
                      <p className="mt-1 text-sm text-gray-600">
                        {item.ingredients.join(", ")}
                      </p>
                    </details>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </main>

        {/* Toast */}
        <div
          className={`pointer-events-none fixed inset-x-0 bottom-6 flex justify-center transition-all duration-300 ${
            toast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
          aria-live="polite"
        >
          <div className="pointer-events-auto rounded-xl bg-gray-900 text-white px-4 py-2 text-sm shadow-lg">
            Added <span className="font-medium">{toast?.name}</span> to your order
          </div>
        </div>
      </div>
    </div>
  );
}
