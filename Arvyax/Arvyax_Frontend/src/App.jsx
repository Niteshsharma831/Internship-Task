import React from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { getUser, clearAuth } from "./auth";

export default function App() {
  const user = getUser();
  const location = useLocation();
  const navigate = useNavigate();

  const navLinkClass = (path) =>
    `px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
      location.pathname === path
        ? "bg-blue-500 text-white shadow-sm"
        : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
    }`;

  const handleLogout = () => {
    clearAuth(); // Clears token and user from localStorage
    alert("✅ Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex flex-wrap gap-3 items-center justify-between">
          {/* Brand */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Arvyax Wellness
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-3">
            <Link to="/" className={navLinkClass("/")}>
              Public
            </Link>
            <Link to="/my-sessions" className={navLinkClass("/my-sessions")}>
              My Sessions
            </Link>

            {!user ? (
              <Link
                to="/login"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-6 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 mt-auto">
        <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>
            © {new Date().getFullYear()} Arvyax Wellness. All rights reserved.
          </p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
