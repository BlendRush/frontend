import React, { useMemo, useState } from "react";
import NavSearchBar from "../Component/N-SearchBar.js";

// ---- Sample data -----------------------------------------------------------
const CATEGORIES = [
  "Smoothies",
  "Fresh Juices",
  "Bowls",
  "Shots",
  "Add-ons",
];

const ITEMS = [
  {
    id: "s1",
    name: "Tropical Sunrise",
    category: "Smoothies",
    price: 5.5,
    kcal: 230,
    tags: ["vegan", "no-added-sugar"],
    image:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1200&auto=format&fit=crop",
    ingredients: ["Mango", "Pineapple", "Banana", "Orange", "Coconut water"],
  },
  {
    id: "s2",
    name: "Berry Boost",
    category: "Smoothies",
    price: 6.0,
    kcal: 210,
    tags: ["vegan", "antioxidant"],
    image:
      "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop",
    ingredients: ["Blueberry", "Strawberry", "Raspberry", "Oat milk", "Chia"],
  },
  {
    id: "s3",
    name: "Green Machine",
    category: "Smoothies",
    price: 6.5,
    kcal: 190,
    tags: ["vegan", "low-sugar"],
    image:
      "https://images.unsplash.com/photo-1548865167-2f1742aa0354?q=80&w=1200&auto=format&fit=crop",
    ingredients: ["Kale", "Spinach", "Green apple", "Kiwi", "Lime", "Almonds"],
  },
  {
    id: "j1",
    name: "Orange You Glad",
    category: "Fresh Juices",
    price: 4.0,
    kcal: 120,
    tags: ["vitamin-c"],
    image:
      "https://images.unsplash.com/photo-1582582621959-48d2646b13f8?q=80&w=1200&auto=format&fit=crop",
    ingredients: ["Fresh orange"],
  },
  {
    id: "j2",
    name: "ABC Juice",
    category: "Fresh Juices",
    price: 4.5,
    kcal: 130,
    tags: ["vegan", "detox"],
    image:
      "https://images.unsplash.com/photo-1542444459-db63c9f0570d?q=80&w=1200&auto=format&fit=crop",
    ingredients: ["Apple", "Beetroot", "Carrot", "Ginger"],
  },
  {
    id: "b1",
    name: "Acai Power Bowl",
    category: "Bowls",
    price: 7.5,
    kcal: 380,
    tags: ["vegan", "protein"],
    image:
      "https://images.unsplash.com/photo-1526312426976-593c2d0aaeda?q=80&w=1200&auto=format&fit=crop",
    ingredients: ["Acai", "Granola", "Banana", "Peanut butter", "Cacao nibs"],
  },
  {
    id: "b2",
    name: "Tropical Chia Bowl",
    category: "Bowls",
    price: 7.0,
    kcal: 340,
    tags: ["vegan", "omega-3"],
    image:
      "https://images.unsplash.com/photo-1526318472351-2a6b1b1e93f0?q=80&w=1200&auto=format&fit=crop",
    ingredients: ["Chia", "Coconut milk", "Mango", "Pineapple", "Toasted coconut"],
  },
  {
    id: "sh1",
    name: "Ginger Shot",
    category: "Shots",
    price: 2.0,
    kcal: 25,
    tags: ["detox", "immunity"],
    image:
      "https://images.unsplash.com/photo-1605470023824-3f3ddd12ad0a?q=80&w=1200&auto=format&fit=crop",
    ingredients: ["Ginger", "Lemon", "Honey"],
  },
  {
    id: "a1",
    name: "Plant Protein Scoop",
    category: "Add-ons",
    price: 1.2,
    kcal: 80,
    tags: ["protein"],
    image:
      "https://images.unsplash.com/photo-1514996937319-344454492b37?q=80&w=1200&auto=format&fit=crop",
    ingredients: ["Pea protein"],
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
  const [activeTags, setActiveTags] = useState([]); // array of keys
  const [sortBy, setSortBy] = useState("popular");
  const [toast, setToast] = useState(null); // {name}

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
        // keep original order as "popular"
        break;
    }
    return list;
  }, [category, search, activeTags, sortBy]);

  const handleAdd = (item) => {
    setToast({ name: item.name });
    setTimeout(() => setToast(null), 1800);
  };

  return (
    <div className="min-h-screen pt-28 bg-gradient-to-b from-emerald-50 to-white">
      <NavSearchBar search={search} onSearchChange={(v) => setSearch(v)} />
      <main id="menu" className="mx-auto max-w-6xl px-4 pb-24">
        {/* Hero */}
        <section className="mt-8 rounded-2xl bg-emerald-600 text-white p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-semibold">Our Menu</h1>
            <p className="mt-1 text-emerald-50">Choose your vibe: green, fruity, protein-packed—it's all here.</p>
            <div className="mt-4 md:hidden">
              <div className="relative">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search smoothies, ingredients…"
                  className="w-full rounded-xl border border-white/20 bg-white/10 placeholder-white/70 pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/70"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/80"
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
          <img
            alt="Smoothie banner"
            className="h-28 w-28 md:h-36 md:w-36 object-cover rounded-2xl shadow-lg ring-4 ring-white/20"
            src="https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=1000&auto=format&fit=crop"
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
          Showing <span className="font-medium text-gray-900">{filtered.length}</span> item{filtered.length !== 1 ? "s" : ""}
          {activeTags.length ? (
            <> with {activeTags.length} filter{activeTags.length !== 1 ? "s" : ""}</>
          ) : null}
        </p>

        {/* Grid */}
        <section className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <article
              key={item.id}
              className="group rounded-2xl bg-white border border-emerald-100 shadow-sm hover:shadow-md transition-shadow"
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

              <div className="p-4">
                <h3 className="text-base font-semibold text-gray-900 line-clamp-1">{item.name}</h3>
                <div className="mt-1 flex items-center justify-between">
                  <p className="text-sm text-gray-500">{item.kcal} kcal</p>
                  <p className="text-emerald-700 font-semibold">{formatCurrency(item.price)}</p>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <button
                    onClick={() => handleAdd(item)}
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
      >
        <div className="pointer-events-auto rounded-xl bg-gray-900 text-white px-4 py-2 text-sm shadow-lg">
          Added <span className="font-medium">{toast?.name}</span> to your order
        </div>
      </div>
    </div>
  );
}
