import React, { useEffect, useRef, useState } from "react";

export default function Dropdown({ label = "Explore", items = [] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onClick(e) {
      if (!ref.current?.contains(e.target)) setOpen(false);
    }
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-xl px-3 py-2 text-slate-700 hover:bg-white/40"
      >
        <span className="font-medium">{label}</span>
        <svg
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-xl border border-white/40 bg-white/90 backdrop-blur shadow-xl">
          <ul className="py-1">
            {items.map((it) => (
              <li key={it.label}>
                <a
                  href={it.href}
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50"
                >
                  {it.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
