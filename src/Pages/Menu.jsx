import { useEffect, useMemo, useState } from "react";
import NavSearchBar from "../Component/N-SearchBar.js";
import BannerImg from "../assets/Banner.png";
import BgImg from "../assets/MBg.png";
import { getMenuService } from "../services/MenuService.jsx";
import { getLocalStoragedata } from "../helpers/Storage.js";
import { useNotification } from "../context/NotificationContext.jsx";

const formatCurrency = (n) => `$${n.toFixed(2)}`;

export default function MenuPage() {
  const [category, setCategory] = useState(null);
  const [search, setSearch] = useState("");
  const [activeTags, setActiveTags] = useState([]);
  const [sortBy, setSortBy] = useState("popular");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const { openNotification } = useNotification();

  useEffect(() => {
    fetchMenuItemData();
  }, []);

  const fetchMenuItemData = async () => {
    setLoading(true);
    const response = await getMenuService();

    if (response.success) {
      setItems(response.data);

      const uniqueCats = [...new Set(response.data.map((it) => it.category))];
      setCategories(["All", ...uniqueCats]);

      if (!category) {
        setCategory("All");
      }
      if (uniqueCats.length && !category) {
        setCategory(uniqueCats[0]);
      }
    } else {
      console.log("Error:", response.message);
    }

    setLoading(false);
  };

  const filtered = useMemo(() => {
    if (!category) return [];

    let list =
      category && category !== "All"
        ? items.filter(
          (it) => it.category?.toLowerCase() === category.toLowerCase()
        )
        : [...items];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (it) =>
          it.name.toLowerCase().includes(q) ||
          (it.ingredients || []).join(" ").toLowerCase().includes(q)
      );
    }

    if (activeTags.length) {
      list = list.filter((it) =>
        activeTags.every((t) => (it.tags || []).includes(t))
      );
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
  }, [category, search, activeTags, sortBy, items]);

 const handleAdd = async (item) => {
  try {
    const token = getLocalStoragedata("token");
    if (!token) {
      return openNotification("error", "Please log in first");
    }

    const res = await fetch("http://localhost:3000/api/carts/cart-items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        itemId: item.itemId, 
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: 1,
      }),
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || "Failed to add item");
    }

    openNotification("success", `${item.name} added to cart`);
  } catch (error) {
    console.error(error);
    openNotification("error", error.message || "Something went wrong");
  }
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

          <section className="mt-6">
            <div className="flex justify-between items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {/* Categories */}
              <div className="flex gap-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`rounded-xl px-4 py-2 text-sm font-medium transition-all border ${c === category
                        ? "bg-emerald-600 text-white border-emerald-600 shadow"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              {/* Sort by */}
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
            </div>
          </section>

          {/* Count */}
          <p className="mt-3 text-sm text-gray-600">
            Showing{" "}
            <span className="font-medium text-gray-900">{filtered.length}</span>{" "}
            item{filtered.length !== 1 ? "s" : ""}
            {activeTags.length ? (
              <>
                {" "}
                with {activeTags.length} filter
                {activeTags.length !== 1 ? "s" : ""}
              </>
            ) : null}
          </p>

          {/* Grid */}
          {loading}
          <section className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {loading ? (
              <div className="col-span-full flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
              </div>
            ) : filtered.length > 0 ? (
              filtered.map((item) => (
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
                      {(Array.isArray(item.tags) ? item.tags : [])
                        .flatMap((t) =>
                          t
                            .split(",")
                            .map((s) => s.replace(/(^"|"$)/g, "").trim())
                        )
                        .slice(0, 2)
                        .map((t) => (
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
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 py-10">
                No items found.
              </p>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
