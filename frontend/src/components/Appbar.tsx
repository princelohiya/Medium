import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { Avatar } from "./BlogCard";
import { Plus, ChevronDown } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const Appbar = () => {
  const { user, logout } = useAuth(); // ✅ single source of truth
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* LEFT */}
        <Link to="/blogs" className="flex items-center">
          <img
            src="/medium-logo.png"
            alt="Medium"
            className="h-8 sm:h-9 object-contain"
          />
        </Link>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          {/* Write button */}
          <Link to="/publish" className="hidden md:inline-flex">
            <button className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">
              <Plus className="h-4 w-4" />
              Write
            </button>
          </Link>

          {/* Avatar */}
          <div className="relative" ref={avatarRef}>
            <button
              onClick={() => setAvatarMenuOpen(!avatarMenuOpen)}
              className="flex items-center gap-1"
            >
              <Avatar size="big" name={user?.name} />
              <ChevronDown className="h-4 w-4 text-slate-500" />
            </button>

            {avatarMenuOpen && (
              <div className="absolute right-0 mt-2 w-44 rounded-xl bg-white shadow-lg border border-slate-200 text-sm overflow-hidden">
                <div className="px-4 py-2 text-xs text-slate-500">
                  Signed in as <span className="font-medium">{user?.name}</span>
                </div>
                <div className="h-px bg-slate-100" />
                <button
                  onClick={() => {
                    navigate("/profile");
                    setAvatarMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2.5 hover:bg-slate-50"
                >
                  Profile
                </button>
                <button
                  onClick={() => {
                    logout();
                    navigate("/signin");
                  }}
                  className="block w-full text-left px-4 py-2.5 text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu */}
          <button
            className="md:hidden text-slate-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  mobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 px-4 py-4 bg-white">
          <Link
            to="/publish"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 rounded-full bg-slate-900 py-2 text-white text-sm font-medium"
          >
            <Plus className="h-4 w-4" />
            Write
          </Link>
        </div>
      )}
    </header>
  );
};
