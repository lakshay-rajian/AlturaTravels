// src/pages/NotFound.jsx
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-100 px-6">
      <h1 className="text-6xl font-bold text-[#2E4D38]">404</h1>
      <p className="mt-4 text-lg text-gray-600">
        Oops! The page you're looking for doesn’t exist.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-[#2E4D38] text-white rounded-lg shadow hover:bg-[#24402e] transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
