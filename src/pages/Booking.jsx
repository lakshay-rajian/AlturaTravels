// src/pages/Booking.jsx
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import AuthLayout from "../layouts/AuthLayout";

export default function Booking() {
  const [packages, setPackages] = useState([]);
  const [params] = useSearchParams();
  const [form, setForm] = useState({
    packageId: "",
    travelers: 1,
    date: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/packages`);
        setPackages(res.data);
        const preselect = params.get("packageId");
        if (preselect) {
          const exists = res.data.some((p) => p._id === preselect);
          if (exists) {
            setForm((f) => ({ ...f, packageId: preselect }));
          }
        }
      } catch (err) {
        console.error("Error fetching packages", err);
        setError("Failed to load packages");
      }
    };
    fetchPackages();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/bookings`,
        { ...form },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setSuccess("Booking successful!");
      setForm({ packageId: "", travelers: 1, date: "" });
    } catch (err) {
      setError("Booking failed. Please try again.");
    }
  };

  return (
    <AuthLayout
      title="Book Your Trip"
      subtitle="Choose your package and plan your next adventure"
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-600 text-center">{success}</p>}

        {/* Package Dropdown */}
        <div>
          <label className="block text-left text-gray-700">
            Select Package
          </label>
          <select
            name="packageId"
            value={form.packageId}
            onChange={handleChange}
            required
            className="w-full mt-2 px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="">-- Choose a Package --</option>
            {packages.map((pkg) => (
              <option key={pkg._id} value={pkg._id}>
                {pkg.name} ({pkg.location})
              </option>
            ))}
          </select>
        </div>

        {/* Travelers */}
        <div>
          <label className="block text-left text-gray-700">
            Number of Travelers
          </label>
          <input
            type="number"
            name="travelers"
            min="1"
            value={form.travelers}
            onChange={handleChange}
            required
            className="w-full mt-2 px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Enter number of travelers"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-left text-gray-700">Travel Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="w-full mt-2 px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-[#2E4D38] text-white font-semibold rounded-lg hover:bg-yellow-500 hover:text-[#2E4D38] transition shadow-md"
        >
          Confirm Booking
        </button>
      </form>
    </AuthLayout>
  );
}
