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
  });
  const [blogEditingId, setBlogEditingId] = useState(null);
  // Enquiries state
  const [enquiries, setEnquiries] = useState([]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
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
      setLoading(false);
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
      fetchBookings();
      const id = setInterval(fetchBookings, 5000);
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
        imageUrl = `${import.meta.env.VITE_IMAGE_URL}${up.data.url}`;
      }
      if (imageUrl?.startsWith("/uploads/")) {
        imageUrl = `${import.meta.env.VITE_IMAGE_URL}${imageUrl}`;
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
      if (blogEditingId) {
        const res = await axios.put(
          `${import.meta.env.VITE_API_URL}/blogs/${blogEditingId}`,
          blogForm,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setBlogs((prev) =>
          prev.map((b) => (b._id === blogEditingId ? res.data : b)),
        );
      } else {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/blogs`,
          blogForm,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setBlogs((prev) => [res.data, ...prev]);
      }
      setBlogForm({ title: "", content: "", author: "", image: "" });
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
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Manage Bookings
            </h1>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            {loading ? (
              <p className="text-gray-600">Loading...</p>
            ) : bookings.length === 0 ? (
              <p className="text-gray-600">No bookings yet.</p>
            ) : (
              <div className="overflow-x-auto bg-white border rounded-lg">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Package
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Travelers
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        User Email
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((b) => (
                      <tr key={b._id} className="border-t">
                        <td className="px-4 py-3">{b.packageName}</td>
                        <td className="px-4 py-3">
                          {new Date(b.date).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">{b.travelers}</td>
                        <td className="px-4 py-3">{b.userId?.email || "-"}</td>
                        <td className="px-4 py-3 capitalize">{b.status}</td>
                        <td className="px-4 py-3 space-x-2">
                          <button
                            onClick={() => updateStatus(b._id, "confirmed")}
                            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => updateStatus(b._id, "cancelled")}
                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                          >
                            Cancel
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="p-4 flex justify-end">
                  <button
                    onClick={() => {
                      const header = [
                        "Package",
                        "Date",
                        "Travelers",
                        "Email",
                        "Status",
                      ];
                      const rows = bookings.map((b) => [
                        b.packageName,
                        new Date(b.date).toLocaleDateString(),
                        String(b.travelers),
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
                      a.download = `bookings-${Date.now()}.csv`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
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
                      <h3 className="text-lg font-semibold">{p.name}</h3>
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
              <input
                value={blogForm.image}
                onChange={(e) =>
                  setBlogForm({ ...blogForm, image: e.target.value })
                }
                placeholder="Image URL"
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
                      <h3 className="text-lg font-semibold">{b.title}</h3>
                      <p className="text-sm text-gray-500">
                        {b.author || "Unknown"}
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
