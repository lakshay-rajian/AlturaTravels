// src/layouts/AuthLayout.jsx
import { Link } from "react-router-dom";

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Hero Section */}
      <div className="relative hidden md:block overflow-hidden bg-[#12311f]">
        <img
          src="/hero.jpg"
          alt="Travel background"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        {/* Vibrant Gradient Overlay & Blooms */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2E4D38]/90 via-[#12311f]/80 to-[#2E4D38]/90 mix-blend-multiply"></div>
        <div className="absolute inset-0">
          <div className="absolute top-[10%] left-[10%] w-80 h-80 bg-amber-500 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-pulse"></div>
          <div className="absolute bottom-[10%] right-[10%] w-96 h-96 bg-teal-400 rounded-full mix-blend-screen filter blur-[120px] opacity-40"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center text-white h-full p-10 text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-white rounded-full filter blur-[30px] opacity-20"></div>
            <img
              src="/logo.jpg"
              alt="Altura Travels Logo"
              className="relative w-36 h-36 object-cover rounded-full mb-6 border-4 border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.5)]"
            />
          </div>
          <h1 className="text-5xl font-black tracking-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">Altura Travels</h1>
          <div className="w-24 h-1.5 bg-amber-400 mt-4 rounded-full shadow-[0_0_15px_rgba(251,191,36,0.8)]"></div>
          <p className="mt-6 text-xl max-w-sm text-gray-100 font-medium drop-shadow-md">
            Discover the world with us.  
            <br />Your next adventure starts here!
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
