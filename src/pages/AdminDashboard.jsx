// src/pages/AdminDashboard.jsx
import { useEffect, useMemo, useState, useContext } from "react";
import axios from "axios";
import {
  LayoutDashboard,
  ClipboardList,
  Package,
  FileText,
  Mail,
  LogOut,
} from "lucide-react";

import { AuthContext } from "../context/AuthContext";

export default function AdminDashboard() {
  const { logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("overview");
  const [bookings, setBookings] = useState([]);
  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter(
    (b) => b.status === "confirmed",
  ).length;
  const pendingBookings = bookings.filter((b) => b.status === "pending").length;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token = useMemo(() => localStorage.getItem("token"), []);

  // Packages state
  const [packages, setPackages] = useState([]);
  const [pkgForm, setPkgForm] = useState({
    name: "",
    description: "",
    price: "",
    location: "",
    duration: "",
    image: "",
    isFeatured: false,
  });
  const [pkgImageFile, setPkgImageFile] = useState(null);
  const [pkgEditingId, setPkgEditingId] = useState(null);

  // Blogs state
  const [blogs, setBlogs] = useState([]);
  const [blogForm, setBlogForm] = useState({
    title: "",
    content: "",
    author: "",
    image: "",
    category: "General",
    isFeatured: false,
  });
  const [blogImageFile, setBlogImageFile] = useState(null);
  const [blogEditingId, setBlogEditingId] = useState(null);
  // Enquiries state
  const [enquiries, setEnquiries] = useState([]);

  const [bookingStatusFilter, setBookingStatusFilter] = useState("all");

  const cancelledBookings = useMemo(
    () => bookings.filter((b) => b.status === "cancelled").length,
    [bookings],
  );

  const filteredBookings = useMemo(() => {
    if (bookingStatusFilter === "all") return bookings;
    return bookings.filter((b) => b.status === bookingStatusFilter);
  }, [bookings, bookingStatusFilter]);

  const fetchBookings = async (isInitial = false) => {
    try {
      if (isInitial) setLoading(true);
      setError("");
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/bookings/admin`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setBookings(res.data);
    } catch (err) {
      setError("Failed to load bookings");
    } finally {
      if (isInitial) setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/bookings/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status } : b)),
      );
    } catch (err) {
      // no-op
    }
  };

  useEffect(() => {
    if (activeTab === "overview" || activeTab === "bookings") {
      fetchBookings(true);
      const id = setInterval(() => fetchBookings(false), 5000);
      return () => clearInterval(id);
    } else if (activeTab === "enquiries") {
      fetchEnquiries();
      const id = setInterval(fetchEnquiries, 5000);
      return () => clearInterval(id);
    }
  }, [activeTab]);

  // -------- Enquiries --------

  // -------- Packages CRUD --------
  const fetchPackagesAdmin = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/packages`);
      setPackages(res.data);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to save package. Please ensure you are logged in as admin.";
      setError(msg);
      console.error("Package save failed:", msg);
    }
  };

  const submitPackage = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = pkgForm.image;
      if (pkgImageFile) {
        const fd = new FormData();
        fd.append("image", pkgImageFile);
        const up = await axios.post(
          `${import.meta.env.VITE_API_URL}/uploads/image`,
          fd,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        imageUrl = up.data.url;
      }
      if (imageUrl?.startsWith("/uploads/")) {
        imageUrl = `${(import.meta.env.VITE_IMAGE_URL || import.meta.env.VITE_API_URL.replace('/api', ''))}${imageUrl}`;
      }
      if (pkgEditingId) {
        const res = await axios.put(
          `${import.meta.env.VITE_API_URL}/packages/${pkgEditingId}`,
          { ...pkgForm, image: imageUrl, price: Number(pkgForm.price) },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setPackages((prev) =>
          prev.map((p) => (p._id === pkgEditingId ? res.data : p)),
        );
      } else {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/packages`,
          { ...pkgForm, image: imageUrl, price: Number(pkgForm.price) },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setPackages((prev) => [res.data, ...prev]);
      }
      setPkgForm({
        name: "",
        description: "",
        price: "",
        location: "",
        duration: "",
        image: "",
        isFeatured: false,
      });
      setPkgImageFile(null);
      setPkgEditingId(null);
      setError("");
    } catch (_) {}
  };

  const editPackage = (p) => {
    setPkgEditingId(p._id);
    setPkgForm({
      name: p.name,
      description: p.description,
      price: String(p.price),
      location: p.location,
      duration: p.duration,
      image: p.image || "",
      isFeatured: p.isFeatured || false,
    });
  };

  const deletePackage = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/packages/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPackages((prev) => prev.filter((p) => p._id !== id));
    } catch (_) {}
  };

  useEffect(() => {
    if (activeTab === "packages") {
      fetchPackagesAdmin();
    }
  }, [activeTab]);

  // -------- Blogs CRUD --------
  const fetchBlogsAdmin = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/blogs`);
      setBlogs(res.data);
    } catch (_) {}
  };

  const submitBlog = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = blogForm.image;
      if (blogImageFile) {
        const fd = new FormData();
        fd.append("image", blogImageFile);
        const up = await axios.post(
          `${import.meta.env.VITE_API_URL}/uploads/image`,
          fd,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        imageUrl = up.data.url;
      }
      if (imageUrl?.startsWith("/uploads/")) {
        imageUrl = `${(import.meta.env.VITE_IMAGE_URL || import.meta.env.VITE_API_URL.replace('/api', ''))}${imageUrl}`;
      }

      if (blogEditingId) {
        const res = await axios.put(
          `${import.meta.env.VITE_API_URL}/blogs/${blogEditingId}`,
          { ...blogForm, image: imageUrl },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setBlogs((prev) =>
          prev.map((b) => (b._id === blogEditingId ? res.data : b)),
        );
      } else {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/blogs`,
          { ...blogForm, image: imageUrl },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setBlogs((prev) => [res.data, ...prev]);
      }
      setBlogForm({
        title: "",
        content: "",
        author: "",
        image: "",
        category: "General",
        isFeatured: false,
      });
      setBlogImageFile(null);
      setBlogEditingId(null);
    } catch (_) {}
  };

  const editBlog = (b) => {
    setBlogEditingId(b._id);
    setBlogForm({
      title: b.title,
      content: b.content,
      author: b.author || "",
      image: b.image || "",
      category: b.category || "General",
      isFeatured: b.isFeatured || false,
    });
  };

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (_) {}
  };

  useEffect(() => {
    if (activeTab === "blogs") {
      fetchBlogsAdmin();
    }
  }, [activeTab]);

  // -------- Enquiries --------
  const fetchEnquiries = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/enquiries/admin`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setEnquiries(res.data);
    } catch (_) {}
  };

  const resolveEnquiry = async (id) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/enquiries/${id}/resolve`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setEnquiries((prev) =>
        prev.map((e) => (e._id === id ? { ...e, status: "resolved" } : e)),
      );
    } catch (_) {}
  };

  useEffect(() => {
    if (activeTab === "enquiries") {
      fetchEnquiries();
    }
  }, [activeTab]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#2E4D38] text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-green-900">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center w-full px-4 py-2 rounded-lg transition ${
              activeTab === "overview" ? "bg-green-900" : "hover:bg-green-800"
            }`}
          >
            <LayoutDashboard className="w-5 h-5 mr-2" /> Overview
          </button>

          <button
            onClick={() => setActiveTab("bookings")}
            className={`flex items-center w-full px-4 py-2 rounded-lg transition ${
              activeTab === "bookings" ? "bg-green-900" : "hover:bg-green-800"
            }`}
          >
            <ClipboardList className="w-5 h-5 mr-2" /> Bookings
          </button>

          <button
            onClick={() => setActiveTab("packages")}
            className={`flex items-center w-full px-4 py-2 rounded-lg transition ${
              activeTab === "packages" ? "bg-green-900" : "hover:bg-green-800"
            }`}
          >
            <Package className="w-5 h-5 mr-2" /> Packages
          </button>

          <button
            onClick={() => setActiveTab("blogs")}
            className={`flex items-center w-full px-4 py-2 rounded-lg transition ${
              activeTab === "blogs" ? "bg-green-900" : "hover:bg-green-800"
            }`}
          >
            <FileText className="w-5 h-5 mr-2" /> Blogs
          </button>

          <button
            onClick={() => setActiveTab("enquiries")}
            className={`flex items-center w-full px-4 py-2 rounded-lg transition ${
              activeTab === "enquiries" ? "bg-green-900" : "hover:bg-green-800"
            }`}
          >
            <Mail className="w-5 h-5 mr-2" /> Enquiries
          </button>
        </nav>

        <div className="p-4 border-t border-green-900">
          <button
            onClick={() => {
              logout();
              window.location.href = "/admin/login";
            }}
            className="flex items-center w-full px-4 py-2 rounded-lg hover:bg-green-800 transition"
          >
            <LogOut className="w-5 h-5 mr-2" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {activeTab === "overview" && (
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Dashboard Overview
            </h1>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="bg-white p-6 rounded-xl border">
                <p className="text-gray-500">Total Bookings</p>
                <p className="text-3xl font-bold">{totalBookings}</p>
              </div>
              <div className="bg-white p-6 rounded-xl border">
                <p className="text-gray-500">Confirmed</p>
                <p className="text-3xl font-bold text-green-600">
                  {confirmedBookings}
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl border">
                <p className="text-gray-500">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {pendingBookings}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "bookings" && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Manage Bookings
                </h1>
                <p className="text-sm text-gray-500">
                  View, filter, and manage customer package bookings
                </p>
              </div>

              {/* Sub-filter tabs */}
              <div className="flex flex-wrap gap-2 bg-white p-1.5 rounded-xl border shadow-sm">
                <button
                  onClick={() => setBookingStatusFilter("all")}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                    bookingStatusFilter === "all"
                      ? "bg-gray-800 text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  All ({bookings.length})
                </button>
                <button
                  onClick={() => setBookingStatusFilter("pending")}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition flex items-center gap-1.5 ${
                    bookingStatusFilter === "pending"
                      ? "bg-amber-600 text-white shadow-sm"
                      : "text-amber-700 bg-amber-50 hover:bg-amber-100"
                  }`}
                >
                  <span>Pending</span>
                  <span className="bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded-full text-[10px]">
                    {pendingBookings}
                  </span>
                </button>
                <button
                  onClick={() => setBookingStatusFilter("confirmed")}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition flex items-center gap-1.5 ${
                    bookingStatusFilter === "confirmed"
                      ? "bg-emerald-700 text-white shadow-sm"
                      : "text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
                  }`}
                >
                  <span>Confirmed</span>
                  <span className="bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded-full text-[10px]">
                    {confirmedBookings}
                  </span>
                </button>
                <button
                  onClick={() => setBookingStatusFilter("cancelled")}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition flex items-center gap-1.5 ${
                    bookingStatusFilter === "cancelled"
                      ? "bg-rose-700 text-white shadow-sm"
                      : "text-rose-700 bg-rose-50 hover:bg-rose-100"
                  }`}
                >
                  <span>Cancelled</span>
                  <span className="bg-rose-200 text-rose-900 px-1.5 py-0.5 rounded-full text-[10px]">
                    {cancelledBookings}
                  </span>
                </button>
              </div>
            </div>

            {error && <p className="text-red-600 mb-4">{error}</p>}

            {loading ? (
              <div className="p-8 text-center bg-white border rounded-lg shadow-sm">
                <p className="text-gray-500">Loading bookings...</p>
              </div>
            ) : filteredBookings.length === 0 ? (
              <div className="p-8 text-center bg-white border rounded-lg shadow-sm">
                <p className="text-gray-500">
                  No {bookingStatusFilter !== "all" ? bookingStatusFilter : ""} bookings found.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto bg-white border rounded-lg shadow-sm">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Package
                      </th>
                      <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Travelers
                      </th>
                      <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        User Details
                      </th>
                      <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {filteredBookings.map((b) => (
                      <tr key={b._id} className="hover:bg-gray-50 transition">
                        <td className="px-4 py-4 text-sm font-semibold text-gray-900">
                          {b.packageName}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-600">
                          {new Date(b.date).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-600">
                          {b.travelers} {b.travelers === 1 ? "Person" : "Persons"}
                        </td>
                        <td className="px-4 py-4 text-sm">
                          <div className="font-medium text-gray-900">
                            {b.userId?.name || "Guest User"}
                          </div>
                          <div className="text-xs text-gray-500">
                            {b.userId?.email || "No email available"}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize ${
                              b.status === "confirmed"
                                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                                : b.status === "pending"
                                ? "bg-amber-50 text-amber-800 border-amber-200"
                                : "bg-rose-50 text-rose-800 border-rose-200"
                            }`}
                          >
                            {b.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm space-x-2">
                          {b.status !== "confirmed" && (
                            <button
                              onClick={() => updateStatus(b._id, "confirmed")}
                              className="px-3 py-1 text-xs font-medium bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition"
                            >
                              Confirm
                            </button>
                          )}
                          {b.status !== "cancelled" && (
                            <button
                              onClick={() => updateStatus(b._id, "cancelled")}
                              className="px-3 py-1 text-xs font-medium bg-rose-600 text-white rounded-md hover:bg-rose-700 transition"
                            >
                              Cancel
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="p-4 flex justify-between items-center bg-gray-50 border-t">
                  <span className="text-xs text-gray-500">
                    Showing {filteredBookings.length} of {bookings.length} total bookings
                  </span>
                  <button
                    onClick={() => {
                      const header = [
                        "Package",
                        "Date",
                        "Travelers",
                        "Name",
                        "Email",
                        "Status",
                      ];
                      const rows = filteredBookings.map((b) => [
                        b.packageName,
                        new Date(b.date).toLocaleDateString(),
                        String(b.travelers),
                        b.userId?.name || "",
                        b.userId?.email || "",
                        b.status,
                      ]);
                      const csv = [header, ...rows]
                        .map((r) =>
                          r
                            .map((v) => `"${String(v).replaceAll('"', '""')}"`)
                            .join(","),
                        )
                        .join("\n");
                      const blob = new Blob([csv], {
                        type: "text/csv;charset=utf-8;",
                      });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = `bookings-${bookingStatusFilter}-${Date.now()}.csv`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="px-4 py-2 text-xs font-medium bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
                  >
                    Export CSV
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "packages" && (
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Manage Packages
            </h1>
            {/* Create / Edit form */}
            <form
              className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-lg border"
              onSubmit={submitPackage}
            >
              <input
                value={pkgForm.name}
                onChange={(e) =>
                  setPkgForm({ ...pkgForm, name: e.target.value })
                }
                placeholder="Name"
                className="px-3 py-2 border rounded"
                required
              />
              <input
                value={pkgForm.location}
                onChange={(e) =>
                  setPkgForm({ ...pkgForm, location: e.target.value })
                }
                placeholder="Location"
                className="px-3 py-2 border rounded"
                required
              />
              <input
                value={pkgForm.duration}
                onChange={(e) =>
                  setPkgForm({ ...pkgForm, duration: e.target.value })
                }
                placeholder="Duration"
                className="px-3 py-2 border rounded"
                required
              />
              <input
                value={pkgForm.price}
                onChange={(e) =>
                  setPkgForm({ ...pkgForm, price: e.target.value })
                }
                placeholder="Price"
                type="number"
                className="px-3 py-2 border rounded"
                required
              />
              <label className="flex items-center gap-2 px-3 py-2 border rounded bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={pkgForm.isFeatured}
                  onChange={(e) =>
                    setPkgForm({
                      ...pkgForm,
                      isFeatured: e.target.checked,
                    })
                  }
                  className="w-4 h-4 text-green-600"
                />
                <span className="text-sm font-medium text-gray-700">
                  Featured Package
                </span>
              </label>
              <input
                value={pkgForm.image}
                onChange={(e) =>
                  setPkgForm({ ...pkgForm, image: e.target.value })
                }
                placeholder="Image URL"
                className="px-3 py-2 border rounded md:col-span-2"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPkgImageFile(e.target.files?.[0] || null)}
                className="px-3 py-2 border rounded md:col-span-2"
              />
              <textarea
                value={pkgForm.description}
                onChange={(e) =>
                  setPkgForm({ ...pkgForm, description: e.target.value })
                }
                placeholder="Description"
                className="px-3 py-2 border rounded md:col-span-2"
                required
              />
              <div className="md:col-span-2 flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2E4D38] text-white rounded"
                >
                  {pkgEditingId ? "Update Package" : "Create Package"}
                </button>
                {pkgEditingId && (
                  <button
                    type="button"
                    onClick={() => {
                      setPkgEditingId(null);
                      setPkgForm({
                        name: "",
                        description: "",
                        price: "",
                        location: "",
                        duration: "",
                        image: "",
                      });
                    }}
                    className="px-4 py-2 bg-gray-200 rounded"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>

            {error && (
              <p className="mt-3 text-red-600" role="alert">
                {error}
              </p>
            )}

            {/* List */}
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {packages.map((p) => (
                <div key={p._id} className="bg-white border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        {p.name}
                        {p.isFeatured && (
                          <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full uppercase">
                            Featured
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {p.location} • {p.duration}
                      </p>
                      <p className="mt-1 text-gray-700 line-clamp-2">
                        {p.description}
                      </p>
                      <p className="mt-2 font-semibold text-yellow-700">
                        ₹{p.price}
                      </p>
                    </div>
                    <div className="space-x-2">
                      <button
                        onClick={() => editPackage(p)}
                        className="px-3 py-1 bg-blue-600 text-white rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deletePackage(p._id)}
                        className="px-3 py-1 bg-red-600 text-white rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "blogs" && (
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Manage Blogs</h1>
            {/* Create / Edit form */}
            <form
              className="mt-6 grid grid-cols-1 gap-4 bg-white p-4 rounded-lg border"
              onSubmit={submitBlog}
            >
              <input
                value={blogForm.title}
                onChange={(e) =>
                  setBlogForm({ ...blogForm, title: e.target.value })
                }
                placeholder="Title"
                className="px-3 py-2 border rounded"
                required
              />
              <input
                value={blogForm.author}
                onChange={(e) =>
                  setBlogForm({ ...blogForm, author: e.target.value })
                }
                placeholder="Author"
                className="px-3 py-2 border rounded"
              />
              <div className="grid grid-cols-2 gap-4">
                <select
                  value={blogForm.category}
                  onChange={(e) =>
                    setBlogForm({ ...blogForm, category: e.target.value })
                  }
                  className="px-3 py-2 border rounded"
                  required
                >
                  <option value="General">General</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Nature">Nature</option>
                </select>
                <label className="flex items-center gap-2 px-3 py-2 border rounded bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={blogForm.isFeatured}
                    onChange={(e) =>
                      setBlogForm({
                        ...blogForm,
                        isFeatured: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-green-600"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Featured Blog
                  </span>
                </label>
              </div>
              <input
                value={blogForm.image}
                onChange={(e) =>
                  setBlogForm({ ...blogForm, image: e.target.value })
                }
                placeholder="Image URL"
                className="px-3 py-2 border rounded"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setBlogImageFile(e.target.files?.[0] || null)}
                className="px-3 py-2 border rounded"
              />
              <textarea
                value={blogForm.content}
                onChange={(e) =>
                  setBlogForm({ ...blogForm, content: e.target.value })
                }
                placeholder="Content"
                className="px-3 py-2 border rounded min-h-32"
                required
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2E4D38] text-white rounded"
                >
                  {blogEditingId ? "Update Blog" : "Publish Blog"}
                </button>
                {blogEditingId && (
                  <button
                    type="button"
                    onClick={() => {
                      setBlogEditingId(null);
                      setBlogForm({
                        title: "",
                        content: "",
                        author: "",
                        image: "",
                      });
                    }}
                    className="px-4 py-2 bg-gray-200 rounded"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>

            {/* List */}
            <div className="mt-6 grid gap-4">
              {blogs.map((b) => (
                <div key={b._id} className="bg-white border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        {b.title}
                        {b.isFeatured && (
                          <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full uppercase">
                            Featured
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {b.author || "Unknown"} • {b.category || "General"}
                      </p>
                      <p className="mt-1 text-gray-700 line-clamp-2">
                        {b.content}
                      </p>
                    </div>
                    <div className="space-x-2">
                      <button
                        onClick={() => editBlog(b)}
                        className="px-3 py-1 bg-blue-600 text-white rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteBlog(b._id)}
                        className="px-3 py-1 bg-red-600 text-white rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "enquiries" && (
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Customer Enquiries
            </h1>
            <div className="mt-4 bg-white border rounded-lg overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                      Name
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                      Email
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                      Phone
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                      Message
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((e) => (
                    <tr key={e._id} className="border-t">
                      <td className="px-4 py-2">{e.name}</td>
                      <td className="px-4 py-2">{e.email}</td>
                      <td className="px-4 py-2">{e.phone}</td>
                      <td className="px-4 py-2">{e.message}</td>
                      <td className="px-4 py-2 capitalize">{e.status}</td>
                      <td className="px-4 py-2">
                        {e.status !== "resolved" && (
                          <button
                            onClick={() => resolveEnquiry(e._id)}
                            className="px-3 py-1 bg-green-600 text-white rounded"
                          >
                            Mark Resolved
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
