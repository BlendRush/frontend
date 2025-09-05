import { NavLink } from "react-router-dom";
import Button from "../Component/Button";
import { useNavigate } from "react-router-dom";

// tiny inline icons (no extra assets)
const HomeIcon = ({ className = "" }) => (
  <svg className={`h-4 w-4 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 11.5 12 4l9 7.5" />
    <path d="M5 10v10h14V10" />
  </svg>
);

const MenuIcon = ({ className = "" }) => (
  <svg className={`h-4 w-4 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
);

export default function NavBar() {
  const navigate = useNavigate();
  const base =
    "group relative inline-flex items-center gap-2 px-3 py-1 rounded-lg " +
    "text-[15px] font-semibold tracking-wide transition-colors";
  const inactive = "text-slate-700 hover:text-slate-900";
  const active = "text-emerald-700 bg-emerald-50 ring-1 ring-emerald-100";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 flex items-center justify-between rounded-3xl border border-white/30 bg-white/40 px-5 py-3 backdrop-blur-md shadow-sm">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2">
            <span className="inline-grid place-items-center h-9 w-9 rounded-xl bg-emerald-500 text-white font-black">
              bR
            </span>
            <div className="leading-tight">
              <div className="text-base font-extrabold tracking-tight text-emerald-600">
                blend<span className="text-slate-800">RUSH</span>
              </div>
            </div>
          </NavLink>

          {/* Links with icons */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink
              to="/"
              className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
            >
              <HomeIcon className="text-emerald-600" />
              <span>Home</span>
            </NavLink>

            <NavLink
              to="/menu"
              className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
            >
              <MenuIcon className="text-emerald-600" />
              <span>Menu</span>
            </NavLink>

            {/* If you have an About page route, point to /about; otherwise keep '#' */}
            <NavLink
              to="/about"
              className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
            >
              <svg className="h-4 w-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8v8M12 16h.01" />
              </svg>
              <span>About</span>
            </NavLink>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button as="a" onClick={() => navigate("/sign-in")} className="text-sm bg-emerald-600/70 text-slate-800 hover:bg-emerald-600">
              Login
            </Button>
            <Button as="a" onClick={() => navigate("/register")} className="text-sm bg-emerald-500 text-white hover:bg-emerald-600">
              Sign Up
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}
