// src/components/Navbar.jsx
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaWhatsapp, FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        {/* Logo with text */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/logo.jpg"
            alt="Altura Travels Logo"
            className="h-10 w-auto"
          />
          <span className="text-2xl font-bold text-green-700">
            Altura Travels
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-gray-700 font-medium items-center">
          <li>
            <Link to="/" className="hover:text-yellow-500 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-yellow-500 transition">
              About
            </Link>
          </li>
          <li>
            <Link to="/packages" className="hover:text-yellow-500 transition">
              Packages
            </Link>
          </li>
          <li>
            <Link to="/blogs" className="hover:text-yellow-500 transition">
              Blogs
            </Link>
          </li>
          <li>
            <Link to="/enquiry" className="hover:text-yellow-500 transition">
              Enquiry
            </Link>
          </li>
          {user ? (
            <li className="relative group">
              <button className="flex items-center space-x-1 hover:text-yellow-500 transition">
                <FaUserCircle className="text-xl" />
                <span>{user.name}</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100 border-b"
                >
                  My Profile
                </Link>
                <Link
                  to="/my-bookings"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  My Bookings
                </Link>
                {user.role === "admin" && (
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 border-t"
                >
                  Logout
                </button>
              </div>
            </li>
          ) : (
            <li>
              <Link
                to="/login"
                className="bg-[#2E4D38] text-white px-5 py-2 rounded-lg hover:bg-yellow-500 hover:text-[#2E4D38] transition"
              >
                Login
              </Link>
            </li>
          )}
        </ul>

        {/* WhatsApp Button (Desktop) */}
        <a
          href="https://wa.me/919871073965"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          <FaWhatsapp className="mr-2" />
          WhatsApp
        </a>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 text-2xl"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t">
          <ul className="flex flex-col space-y-4 p-6 text-gray-700 font-medium">
            <li>
              <Link to="/" onClick={toggleMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={toggleMenu}>
                About
              </Link>
            </li>
            <li>
              <Link to="/packages" onClick={toggleMenu}>
                Packages
              </Link>
            </li>
            <li>
              <Link to="/blogs" onClick={toggleMenu}>
                Blogs
              </Link>
            </li>
            <li>
              <Link to="/enquiry" onClick={toggleMenu}>
                Enquiry
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link to="/profile" onClick={toggleMenu}>
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link to="/my-bookings" onClick={toggleMenu}>
                    My Bookings
                  </Link>
                </li>
                {user.role === "admin" && (
                  <li>
                    <Link to="/admin/dashboard" onClick={toggleMenu}>
                      Admin Panel
                    </Link>
                  </li>
                )}
                <li>
                  <button
                    onClick={() => {
                      logout();
                      toggleMenu();
                    }}
                    className="text-red-600"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  to="/login"
                  onClick={toggleMenu}
                  className="text-green-700"
                >
                  Login / Sign Up
                </Link>
              </li>
            )}
            <li>
              <a
                href="https://wa.me/919871073965"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition w-max"
              >
                <FaWhatsapp className="mr-2" />
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
