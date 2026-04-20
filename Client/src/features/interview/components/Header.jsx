import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";
import { useAuth } from "../../auth/hooks/AuthHook";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { handleLogout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoutClick = async () => {
    await handleLogout();
    setMobileMenuOpen(false);
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-slate-900/60 backdrop-blur-lg border-b border-slate-800">
      <nav className="flex justify-between items-center max-w-6xl mx-auto px-6 py-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-violet-400 tracking-wide">
          SkillSync
        </h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 items-center text-sm">
          <Link
            to="/"
            className={`font-semibold transition-colors ${
              isActive("/")
                ? "text-violet-400 border-b-2 border-violet-400 pb-1"
                : "text-slate-400 hover:text-violet-300"
            }`}
          >
            Dashboard
          </Link>

          <Link
            to="/history"
            className={`font-semibold transition-colors ${
              isActive("/history")
                ? "text-violet-400 border-b-2 border-violet-400 pb-1"
                : "text-slate-400 hover:text-violet-300"
            }`}
          >
            History
          </Link>

          <button
            onClick={handleLogoutClick}
            className="flex items-center gap-2 text-slate-400 hover:text-violet-300 transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 hover:bg-slate-800 rounded-lg transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? (
            <X size={24} className="text-slate-400" />
          ) : (
            <Menu size={24} className="text-slate-400" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-800/50 backdrop-blur-lg border-t border-slate-700">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-4">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`p-2 rounded-lg transition-colors ${
                isActive("/")
                  ? "bg-violet-600/20 text-violet-400 font-semibold"
                  : "text-slate-400 hover:text-violet-300"
              }`}
            >
              Dashboard
            </Link>

            <Link
              to="/history"
              onClick={() => setMobileMenuOpen(false)}
              className={`p-2 rounded-lg transition-colors ${
                isActive("/history")
                  ? "bg-violet-600/20 text-violet-400 font-semibold"
                  : "text-slate-400 hover:text-violet-300"
              }`}
            >
              History
            </Link>

            <button
              onClick={handleLogoutClick}
              className="flex items-center gap-2 p-2 text-slate-400 hover:text-violet-300 transition-colors"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
