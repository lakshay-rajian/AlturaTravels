// src/pages/Blogs.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react"; // modern search icon
import Navbar from "../components/Navbar"; // adjust path if needed
import axios from "axios";

const categories = ["All", "Adventure", "Luxury", "Nature"];

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/blogs`);
        setBlogs(res.data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory =
      selectedCategory === "All" ||
      (blog.category || "General") === selectedCategory;
    const matchesSearch = blog.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <Navbar /> {/* <-- add this */}
      <div className="h-20"></div> {/* spacer for fixed navbar */}
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[60vh]"
        style={{
          backgroundImage: "url('/blogs-hero.jpg')", // <-- place in /public
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
          <h1 className="text-5xl font-bold drop-shadow-lg">Travel Blogs</h1>
          <p className="mt-4 text-lg max-w-2xl">
            Discover inspiring travel stories, guides, and tips to make your
            journeys unforgettable.
          </p>
        </div>
      </section>
      {/* Blog Content */}
      <div className="max-w-7xl mx-auto p-6 mt-12">
        {/* Search Bar */}
        <div className="relative w-full md:w-1/2 mx-auto mb-8">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-5 py-3 pl-12 border rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-[#2E4D38] transition"
          />
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition shadow-sm ${
                selectedCategory === category
                  ? "bg-[#2E4D38] text-white shadow-lg scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-[#2E4D38] hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        {loading ? (
          <p className="text-center text-gray-600 text-lg">Loading blogs...</p>
        ) : filteredBlogs.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-10">
            {filteredBlogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2"
              >
                {/* Blog Image */}
                <img
                  src={
                    blog.image.startsWith("/uploads/")
                      ? `${import.meta.env.VITE_IMAGE_URL}${blog.image}`
                      : blog.image
                  }
                  alt={blog.title}
                  className="w-full h-52 object-cover rounded-t-xl"
                />

                {/* Blog Content */}
                <div className="p-5">
                  <span className="text-sm font-medium text-[#2E4D38] bg-[#2E4D38]/10 px-3 py-1 rounded-full">
                    {blog.category || "General"}
                  </span>
                  <h2 className="text-2xl font-semibold text-gray-800 mt-2">
                    {blog.title}
                  </h2>
                  <p className="text-gray-600 mt-3 line-clamp-3">
                    {blog.content.replace(/<[^>]*>?/gm, "")}
                  </p>

                  {/* Author and Read Time */}
                  <div className="flex items-center mt-4 text-sm text-gray-500">
                    <span className="font-medium">
                      {blog.author || "Admin"}
                    </span>
                    <span className="mx-2">•</span>
                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                  </div>

                  {/* Read More Button */}
                  <Link to={`/blogs/${blog._id}`}>
                    <button className="mt-4 px-5 py-2 bg-[#2E4D38] text-white text-sm font-medium rounded-full hover:bg-[#24402e] transition">
                      Read More →
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">
            No blogs found matching your search.
          </p>
        )}
      </div>
    </div>
  );
}
