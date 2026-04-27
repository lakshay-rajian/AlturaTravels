// src/pages/BlogDetails.jsx
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar"; // adjust path if needed
import axios from "axios";

export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/blogs/${id}`,
        );
        setBlog(res.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("Blog not found");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading blog...</p>
      </div>
    );
  }

  if (!blog || error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-bold mb-4 text-[#2E4D38]">
          {error || "Blog not found"}
        </h1>
        <Link to="/blogs">
          <button className="px-5 py-2 bg-[#2E4D38] text-white rounded-full hover:bg-[#24402e] transition">
            ← Back to Blogs
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[50vh] "
        style={{
          backgroundImage: `url(${blog.image?.startsWith("/uploads/") ? `${import.meta.env.VITE_IMAGE_URL}${blog.image}` : blog.image || "/blog-details-hero.jpg"})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
          <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
            {blog.title}
          </h1>
          <div className="flex items-center mt-4 text-sm text-white bg-black bg-opacity-30 px-4 py-2 rounded-full">
            <span className="font-medium">{blog.author || "Admin"}</span>
            <span className="mx-2">•</span>
            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto p-6">
        {/* Main Image */}
        <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg mb-6">
          <img
            src={
              blog.image?.startsWith("/uploads/")
                ? `${import.meta.env.VITE_IMAGE_URL}${blog.image}`
                : blog.image
            }
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Blog Content */}
        <div
          className="text-gray-700 leading-relaxed mb-6 blog-content prose max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        ></div>

        {/* Back Button */}
        <Link to="/blogs">
          <button className="px-5 py-2 bg-[#2E4D38] text-white rounded-full hover:bg-[#24402e] transition mb-12">
            ← Back to Blogs
          </button>
        </Link>
      </div>
    </div>
  );
}
