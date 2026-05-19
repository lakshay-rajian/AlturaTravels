import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { User, Settings, ShoppingBag, ShieldCheck, Mail, LogOut, ChevronRight } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import MainLayout from "../layouts/MainLayout";

export default function Profile() {
  const { user, login, logout } = useContext(AuthContext);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [stats, setStats] = useState({ total: 0, pending: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        
        // Fetch Profile
        const profileRes = await axios.get(`${import.meta.env.VITE_API_URL}/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setForm({ ...form, name: profileRes.data.name, email: profileRes.data.email });

        // Fetch Bookings for Stats
        const bookingsRes = await fetch(`${import.meta.env.VITE_API_URL}/bookings/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const bookingsData = await bookingsRes.json();
        
        if (bookingsRes.ok) {
          const pending = bookingsData.filter(b => b.status === 'pending').length;
          setStats({ total: bookingsData.length, pending });
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
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
      
      setMessage("Profile updated successfully! ✅");
      login(token, res.data.user); // Update context
      setForm({ ...form, password: "", confirmPassword: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    }
  };

  if (loading) return (
    <MainLayout>
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-[#2E4D38] border-t-transparent rounded-full animate-spin"></div>
      </div>
    </MainLayout>
  );

  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar / Quick Stats */}
          <div className="lg:w-1/3 flex flex-col gap-6">
            
            {/* User Card */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-[#2E4D38] to-emerald-700"></div>
              <div className="relative z-10">
                <div className="w-24 h-24 bg-white rounded-full mx-auto border-4 border-white shadow-md flex items-center justify-center text-4xl font-bold text-[#2E4D38] uppercase">
                  {form.name.charAt(0)}
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mt-4">{form.name}</h2>
                <div className="flex items-center justify-center text-gray-500 mt-1">
                  <Mail className="w-4 h-4 mr-1" />
                  <span className="text-sm">{form.email}</span>
                </div>
                <div className="mt-4 inline-flex items-center px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-semibold border border-green-100">
                  <ShieldCheck className="w-3 h-3 mr-1" /> Verified Member
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Travel Summary</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                  <p className="text-blue-500 font-semibold mb-1">Total Trips</p>
                  <p className="text-3xl font-bold text-blue-700">{stats.total}</p>
                </div>
                <div className="bg-yellow-50 rounded-2xl p-4 border border-yellow-100">
                  <p className="text-yellow-600 font-semibold mb-1">Upcoming</p>
                  <p className="text-3xl font-bold text-yellow-700">{stats.pending}</p>
                </div>
              </div>
            </div>

            {/* Navigation Menu */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <ul className="divide-y divide-gray-50">
                <li>
                  <Link to="/my-bookings" className="flex items-center justify-between p-5 hover:bg-gray-50 transition text-gray-700 hover:text-[#2E4D38]">
                    <div className="flex items-center font-medium">
                      <ShoppingBag className="w-5 h-5 mr-3 text-gray-400" />
                      My Bookings
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                  </Link>
                </li>
                <li>
                  <button onClick={() => { logout(); window.location.href = "/"; }} className="w-full flex items-center justify-between p-5 hover:bg-red-50 transition text-gray-700 hover:text-red-600">
                    <div className="flex items-center font-medium">
                      <LogOut className="w-5 h-5 mr-3 text-gray-400 group-hover:text-red-500" />
                      Logout
                    </div>
                  </button>
                </li>
              </ul>
            </div>
            
          </div>

          {/* Main Content / Profile Settings */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-10">
              <div className="flex items-center mb-8 pb-4 border-b border-gray-100">
                <div className="bg-green-50 p-3 rounded-xl mr-4">
                  <Settings className="w-6 h-6 text-[#2E4D38]" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">Account Settings</h1>
                  <p className="text-gray-500 text-sm mt-1">Manage your personal information and security</p>
                </div>
              </div>

              {message && (
                <div className="mb-8 p-4 bg-green-50 text-green-700 rounded-xl font-medium border border-green-100 flex items-center">
                  {message}
                </div>
              )}
              {error && (
                <div className="mb-8 p-4 bg-red-50 text-red-700 rounded-xl font-medium border border-red-100">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2 text-gray-400" /> Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2E4D38] focus:bg-white outline-none transition"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        value={form.email}
                        disabled
                        className="w-full px-4 py-3 bg-gray-100 border border-gray-200 text-gray-500 rounded-xl cursor-not-allowed"
                      />
                      <p className="mt-1.5 text-xs text-gray-400">Email cannot be changed.</p>
                    </div>
                  </div>
                </div>

                <hr className="border-gray-100" />

                {/* Security */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <ShieldCheck className="w-5 h-5 mr-2 text-gray-400" /> Security
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                      <input
                        type="password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        placeholder="Leave blank to keep same"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2E4D38] focus:bg-white outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                      <input
                        type="password"
                        value={form.confirmPassword}
                        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                        placeholder="Confirm new password"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2E4D38] focus:bg-white outline-none transition"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-[#2E4D38] text-white rounded-xl font-bold hover:bg-yellow-500 hover:text-[#2E4D38] transition shadow-lg inline-flex items-center"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}
