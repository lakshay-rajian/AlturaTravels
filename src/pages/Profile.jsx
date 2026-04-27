import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import MainLayout from "../layouts/MainLayout";

export default function Profile() {
  const { user, login } = useContext(AuthContext);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setForm({ ...form, name: res.data.name, email: res.data.email });
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (form.password && form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/auth/profile`,
        { name: form.name, password: form.password || undefined },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setMessage("Profile updated successfully!");
      login(token, res.data.user); // Update context
      setForm({ ...form, password: "", confirmPassword: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    }
  };

  if (loading) return <div className="p-10 text-center text-gray-600 text-xl">Loading...</div>;

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h1 className="text-3xl font-bold text-[#2E4D38] mb-2 text-center">My Profile</h1>
          <p className="text-gray-500 text-center mb-8">Update your personal information and password</p>

          {message && <p className="mb-6 p-3 bg-green-50 text-green-700 rounded-lg text-center font-medium border border-green-100">{message}</p>}
          {error && <p className="mb-6 p-3 bg-red-50 text-red-700 rounded-lg text-center font-medium border border-red-100">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#2E4D38] outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={form.email}
                disabled
                className="w-full px-4 py-3 border rounded-xl bg-gray-50 text-gray-400 cursor-not-allowed"
              />
              <p className="mt-1 text-xs text-gray-400 italic">Email cannot be changed</p>
            </div>

            <hr className="border-gray-100" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Leave blank to keep same"
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#2E4D38] outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  placeholder="Confirm new password"
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#2E4D38] outline-none transition"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#2E4D38] text-white rounded-xl font-bold text-lg hover:bg-yellow-500 hover:text-[#2E4D38] transition shadow-lg shadow-[#2E4D38]/20"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}
