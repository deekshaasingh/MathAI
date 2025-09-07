import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  return (
    <header className="bg-gray-800 text-white shadow-md px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="text-2xl font-bold hover:text-blue-400 transition"
          aria-label="Toggle sidebar"
        >
          ☰
        </button>
        <h1 className="text-xl font-semibold tracking-wide">Math AI</h1>
      </div>

      <nav className="space-x-6 text-sm font-medium">
        <Link to="/" className="hover:text-blue-400 transition">
          Home
        </Link>
        <Link to="/about" className="hover:text-blue-400 transition">
          About Us
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;

