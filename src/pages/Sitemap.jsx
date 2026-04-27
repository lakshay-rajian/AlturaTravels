// src/pages/Sitemap.jsx
import { Link } from "react-router-dom";

export default function Sitemap() {
  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/packages", label: "Packages" },
    { to: "/blogs", label: "Blogs" },
    { to: "/enquiry", label: "Enquiry" },
    { to: "/bookings", label: "Bookings" },
    { to: "/privacy-policy", label: "Privacy Policy" },
    { to: "/terms-of-service", label: "Terms of Service" },
    { to: "/sitemap", label: "Sitemap" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-[#2E4D38] mb-6">Sitemap</h1>
      <p className="text-gray-700 mb-6">
        Quick access to all public pages on the site.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="block p-4 rounded-lg border border-gray-200 hover:border-[#2E4D38] hover:bg-green-50 transition"
          >
            {l.label}
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <Link to="/" className="px-4 py-2 bg-[#2E4D38] text-white rounded-lg hover:bg-[#24402e] transition">
          Back to Home
        </Link>
      </div>
    </div>
  );
}