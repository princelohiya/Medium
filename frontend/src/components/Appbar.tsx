import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Avatar } from "./BlogCard";

export const Appbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close avatar dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) {
        setAvatarMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <header className="sticky top-0 z-50 bg-black border-b border-slate-800">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/blogs" className="text-2xl font-bold text-white">
          Medium
        </Link>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/publish">
            <button className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-full text-sm font-medium text-white">
              New Blog
            </button>
          </Link>

          {/* Avatar dropdown */}
          <div className="relative" ref={avatarRef}>
            <button onClick={() => setAvatarMenuOpen(!avatarMenuOpen)}>
              <Avatar size="big" name="U" />
            </button>

            {avatarMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border text-sm text-gray-800">
                <button
                  onClick={() => {
                    navigate("/profile");
                    setAvatarMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </button>

                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white"
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

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black border-t border-slate-800 px-4 py-4 space-y-4">
          <Link
            to="/publish"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center bg-green-600 hover:bg-green-700 py-2 rounded-full text-white text-sm font-medium"
          >
            New Blog
          </Link>

          <button
            onClick={() => {
              navigate("/profile");
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left text-white py-2"
          >
            Profile
          </button>

          <button
            onClick={logout}
            className="block w-full text-left text-red-400 py-2"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};
