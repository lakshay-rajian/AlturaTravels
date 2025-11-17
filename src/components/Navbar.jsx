// src/components/Navbar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaWhatsapp } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        
        {/* Logo with text */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/logo.jpg" // place logo.png in /public
            alt="Altura Travels Logo"
            className="h-10 w-auto"
          />
          <span className="text-2xl font-bold text-green-700">
            Altura Travels
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
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
        <div className="md:hidden bg-white shadow-lg">
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
            <li>
              <a
                href="https://wa.me/919876543210"
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
