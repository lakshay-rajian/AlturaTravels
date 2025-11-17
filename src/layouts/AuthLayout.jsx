// src/layouts/AuthLayout.jsx
import { Link } from "react-router-dom";

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Hero Section */}
      <div className="relative hidden md:block">
        <img
          src="/travel-bg.jpg" // add travel image inside /public
          alt="Travel background"
          className="h-full w-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2E4D38]/80 via-[#2E4D38]/70 to-yellow-500/40"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-10 text-center">
          <img
            src="/logo.jpg" // your logo in /public
            alt="Altura Travels Logo"
            className="w-36 h-28 mb-6 drop-shadow-lg"
          />
          <h1 className="text-4xl font-bold drop-shadow-md">Altura Travels</h1>
          <p className="mt-4 text-lg max-w-sm text-yellow-200 drop-shadow-sm">
            Discover the world with us.  
            Your next adventure starts here!
          </p>
        </div>
      </div>

      {/* Right Auth Form Section */}
      <div className="flex items-center justify-center bg-gradient-to-br from-yellow-50 to-white p-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
            <p className="text-gray-500 mt-2">{subtitle}</p>
          </div>

          {/* Form Content */}
          {children}

          {/* Back to Home Link */}
          <div className="mt-4 text-center text-sm text-gray-500">
            <Link
              to="/"
              className="hover:text-[#2E4D38] transition-colors duration-200"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
