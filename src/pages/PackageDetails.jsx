import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MainLayout from "../layouts/MainLayout";

export default function PackageDetails() {
  const { id } = useParams();
  const token = useMemo(() => localStorage.getItem("token"), []);
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ date: "", travelers: 1 });
  const [message, setMessage] = useState("");
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });

  useEffect(() => {
    const fetchPkg = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/packages/${id}`);
        setPkg(res.data);
      } catch (e) {
        setError("Failed to load package");
      } finally {
        setLoading(false);
      }
    };
    fetchPkg();
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/reviews/${id}`);
        setReviews(res.data);
      } catch (_) {}
    };
    fetchReviews();
  }, [id]);

  const handleBook = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/bookings`,
        { packageId: id, travelers: Number(form.travelers), date: form.date },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Booking successful! A confirmation email has been sent.");
      setForm({ date: "", travelers: 1 });
    } catch (_) {
      setMessage("Booking failed. Please try again.");
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : (
            <div className="bg-white rounded-2xl shadow border overflow-hidden">
              {pkg?.image && (
                <img
                  src={pkg.image.startsWith("/uploads/") ? `${import.meta.env.VITE_IMAGE_URL}${pkg.image}` : pkg.image}
                  alt={pkg.name}
                  className="w-full h-80 object-cover"
                  loading="lazy"
                />
              )}
              <div className="p-6">
                <h1 className="text-3xl font-bold text-[#2E4D38]">
                  {pkg?.name}
                </h1>
                <p className="text-gray-500 mt-1">
                  {pkg?.location} • {pkg?.duration}
                </p>
                <p className="mt-4 text-gray-700 leading-relaxed">
                  {pkg?.description}
                </p>
                <div className="mt-6">
                  <h2 className="text-xl font-semibold">Highlights</h2>
                  <ul className="mt-2 list-disc pl-5 text-gray-700 space-y-1">
                    <li>Curated stays and experiences</li>
                    <li>Local expert guides</li>
                    <li>Flexible cancellations</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sticky booking sidebar */}
        <aside className="lg:sticky lg:top-6 h-max">
          <div className="bg-white rounded-2xl shadow border p-6">
            <p className="text-gray-600">Starting from</p>
            <p className="text-3xl font-extrabold text-yellow-600">
              ₹{pkg?.price}
            </p>
            <form className="mt-6 space-y-4" onSubmit={handleBook}>
              <div>
                <label className="block text-gray-700">Travel Date</label>
                <input
                  type="date"
                  className="w-full mt-1 px-3 py-2 border rounded"
                  required
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-gray-700">Travelers</label>
                <input
                  type="number"
                  min="1"
                  className="w-full mt-1 px-3 py-2 border rounded"
                  required
                  value={form.travelers}
                  onChange={(e) =>
                    setForm({ ...form, travelers: e.target.value })
                  }
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#2E4D38] text-white rounded-lg hover:bg-yellow-500 hover:text-[#2E4D38] transition"
              >
                Book Now
              </button>
              {message && <p className="text-center text-sm mt-2">{message}</p>}
            </form>
            <div className="mt-6 text-sm text-gray-600">
              <p>• Free cancellation within 48 hours</p>
              <p>• 24x7 customer support</p>
            </div>
          </div>
        </aside>

        {/* Reviews */}
        <div className="lg:col-span-2">
          <div className="mt-8 bg-white rounded-2xl border shadow p-6">
            <h2 className="text-xl font-semibold">Reviews</h2>
            <form
              className="mt-4 flex flex-col gap-3"
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await axios.post(
                    `${import.meta.env.VITE_API_URL}/reviews/${id}`,
                    reviewForm,
                    { headers: { Authorization: `Bearer ${token}` } }
                  );
                  setReviewForm({ rating: 5, comment: "" });
                  const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/reviews/${id}`
                  );
                  setReviews(res.data);
                } catch (_) {}
              }}
            >
              <div className="flex gap-3">
                <select
                  value={reviewForm.rating}
                  onChange={(e) =>
                    setReviewForm({
                      ...reviewForm,
                      rating: Number(e.target.value),
                    })
                  }
                  className="px-3 py-2 border rounded"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n} ★
                    </option>
                  ))}
                </select>
                <input
                  value={reviewForm.comment}
                  onChange={(e) =>
                    setReviewForm({ ...reviewForm, comment: e.target.value })
                  }
                  className="flex-1 px-3 py-2 border rounded"
                  placeholder="Share your experience"
                />
                <button className="px-4 py-2 bg-[#2E4D38] text-white rounded">
                  Submit
                </button>
              </div>
            </form>

            <div className="mt-4 space-y-4">
              {reviews.length === 0 ? (
                <p className="text-gray-600">No reviews yet.</p>
              ) : (
                reviews.map((r) => (
                  <div key={r._id} className="border rounded p-3">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">
                        {r.userId?.name || "Traveler"}
                      </p>
                      <p>
                        {"★".repeat(r.rating)}
                        {"☆".repeat(5 - r.rating)}
                      </p>
                    </div>
                    {r.comment && (
                      <p className="text-gray-700 mt-1">{r.comment}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
