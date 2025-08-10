import React from "react";

export default function Button({
  children,
  as = "button",
  className = "",
  ...props
}) {
  const Comp = as;
  return (
    <Comp
      className={[
        "inline-flex items-center gap-2 rounded-2xl px-5 py-3",
        "font-semibold shadow-md hover:shadow-lg transition-all",
        "bg-emerald-500 text-white hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-300",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className="h-4 w-4 -mr-1 opacity-90"
        fill="currentColor"
      >
        <path d="M7.05 4.55a1 1 0 0 0 0 1.41l4 4-4 4a1 1 0 1 0 1.41 1.41l4.7-4.7a1 1 0 0 0 0-1.41l-4.7-4.7a1 1 0 0 0-1.41 0z" />
      </svg>
    </Comp>
  );
}
