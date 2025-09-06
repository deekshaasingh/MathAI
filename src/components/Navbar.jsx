import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="bg-gray-800 text-white shadow-lg px-4 py-3 flex items-center justify-between">
      {/* Left side */}
      <div className="flex items-center space-x-4">
        {/* Sidebar toggle */}
        <button
          onClick={toggleSidebar}
          className="text-2xl font-bold hover:text-blue-400 transition-colors"
        >
          ☰
        </button>
        <h1 className="text-xl font-semibold tracking-wide">Math AI</h1>
      </div>

      {/* Right side - links */}
      <div className="space-x-6">
        <Link to="/" className="hover:text-blue-400 transition-colors font-medium">
          Home
        </Link>
        <Link to="/about" className="hover:text-blue-400 transition-colors font-medium">
          About Us
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
