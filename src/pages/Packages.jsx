// src/pages/Packages.jsx
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");
  const [budget, setBudget] = useState([0, 100000]);
  const [duration, setDuration] = useState("");
  const [sortBy, setSortBy] = useState("popularity");
  const filtered = useMemo(() => {
    let list = [...packages];
    if (q) {
      const s = q.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(s) ||
          p.location.toLowerCase().includes(s)
      );
    }
    list = list.filter((p) => p.price >= budget[0] && p.price <= budget[1]);
    if (duration)
      list = list.filter((p) =>
        (p.duration || "").toLowerCase().includes(duration.toLowerCase())
      );
    if (sortBy === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);
    return list;
  }, [packages, q, budget, duration, sortBy]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/packages");
        setPackages(res.data);
      } catch (err) {
        console.error("Error fetching packages", err);
        setError("Failed to load packages. Please try again later.");
      }
    };
    fetchPackages();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-center text-[#2E4D38] mb-12">
        Explore Our Travel Packages
      </h1>

      {/* Filters */}
      <div className="mb-8 bg-white p-4 rounded-xl shadow border grid md:grid-cols-4 gap-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search destination or package"
          className="px-3 py-2 border rounded"
        />
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            value={budget[0]}
            onChange={(e) => setBudget([Number(e.target.value), budget[1]])}
            className="w-24 px-3 py-2 border rounded"
          />
          <span>to</span>
          <input
            type="number"
            min="0"
            value={budget[1]}
            onChange={(e) => setBudget([budget[0], Number(e.target.value)])}
            className="w-24 px-3 py-2 border rounded"
          />
          <span className="text-sm text-gray-500">Budget</span>
        </div>
        <input
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Duration e.g. 4D/3N"
          className="px-3 py-2 border rounded"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          <option value="popularity">Sort by</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {filtered.length === 0 && !error ? (
        <p className="text-gray-600 text-center">
          No packages available right now. Please check back later!
        </p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((pkg) => (
            <div
              key={pkg._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition"
            >
              {/* Image */}
              {pkg.image && (
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-56 object-cover"
                  loading="lazy"
                />
              )}

              {/* Content */}
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-[#2E4D38]">
                  {pkg.name}
                </h2>
                <p className="text-gray-500 text-sm mb-2">
                  {pkg.location} • {pkg.duration}
                </p>
                <p className="text-gray-600 mb-4">{pkg.description}</p>
                <p className="text-lg font-bold text-yellow-600 mb-4">
                  ₹{pkg.price}
                </p>

                <button
                  onClick={() => {
                    const token = localStorage.getItem("token");
                    const redirect = encodeURIComponent(
                      `/bookings?packageId=${pkg._id}`
                    );
                    if (token) {
                      window.location.href = `/bookings?packageId=${pkg._id}`;
                    } else {
                      window.location.href = `/login?redirect=${redirect}`;
                    }
                  }}
                  className="w-full py-2 bg-[#2E4D38] text-white rounded-lg font-medium hover:bg-yellow-500 hover:text-[#2E4D38] transition"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
