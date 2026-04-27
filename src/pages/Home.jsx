import { useEffect, useState } from "react";
import Navbar from "../components/Navbar"; // Make sure path is correct
import {
  FaMapMarkedAlt,
  FaUmbrellaBeach,
  FaMountain,
  FaGlobeAsia,
  FaWhatsapp,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [featuredPackages, setFeaturedPackages] = useState([]);
  const [latestBlogs, setLatestBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pkgRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/packages`,
        );
        setFeaturedPackages(pkgRes.data.slice(0, 3));

        const blogRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/blogs`,
        );
        setLatestBlogs(blogRes.data.slice(0, 3));
      } catch (err) {
        console.error("Error fetching home data:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-gray-50 text-gray-900">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[90vh]"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#2E4D38] drop-shadow-lg">
            Discover the World with Altura Travels
          </h1>
          <p className="mt-6 text-lg md:text-2xl max-w-2xl text-white drop-shadow">
            Explore exclusive packages, colorful adventures, and unforgettable
            journeys across India.
          </p>
          <a
            href="/packages"
            className="mt-8 bg-yellow-400 px-6 py-3 rounded-lg text-[#2E4D38] font-semibold hover:bg-yellow-500 transition shadow-lg"
          >
            View Packages
          </a>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-gray-50 to-green-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#2E4D38] relative inline-block">
            About Us
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-yellow-400 rounded-full"></span>
          </h2>
          <p className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto">
            At Altura Travels, we believe travel is not just about destinations,
            but about experiences. Whether you seek luxury, adventure, or
            relaxation, we design trips that create lifelong memories. Join us
            and explore the world like never before.
          </p>
        </div>
      </section>

      {/* Popular Packages Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold text-[#2E4D38]">
                Popular Destinations
              </h2>
              <p className="text-gray-600 mt-2 text-lg">
                Handpicked experiences for your next adventure
              </p>
            </div>
            <Link
              to="/packages"
              className="text-green-700 font-semibold flex items-center hover:underline"
            >
              View All <FaArrowRight className="ml-2 text-sm" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPackages.map((pkg) => (
              <div
                key={pkg._id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group transition hover:shadow-2xl"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={
                      pkg.image?.startsWith("/uploads/")
                        ? `${import.meta.env.VITE_IMAGE_URL}${pkg.image}`
                        : pkg.image
                    }
                    alt={pkg.name}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[#2E4D38] font-bold shadow-sm">
                    ₹{pkg.price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#2E4D38]">
                    {pkg.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-3">
                    {pkg.location} • {pkg.duration}
                  </p>
                  <p className="text-gray-600 line-clamp-2 text-sm mb-4">
                    {pkg.description}
                  </p>
                  <Link
                    to={`/packages/${pkg._id}`}
                    className="block text-center py-2 bg-gray-50 text-[#2E4D38] border border-[#2E4D38]/20 rounded-lg font-medium hover:bg-[#2E4D38] hover:text-white transition"
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-[#2E4D38] relative inline-block">
            Our Services
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-yellow-400 rounded-full"></span>
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2 text-center">
              <FaMapMarkedAlt className="text-5xl text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#2E4D38]">Guided Tours</h3>
              <p className="mt-2 text-gray-600">
                Explore new places with expert guides and personalized
                itineraries.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2 text-center">
              <FaUmbrellaBeach className="text-5xl text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#2E4D38]">
                Beach Holidays
              </h3>
              <p className="mt-2 text-gray-600">
                Relax on serene beaches with luxury resorts and water sports.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2 text-center">
              <FaMountain className="text-5xl text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#2E4D38]">
                Adventure Trips
              </h3>
              <p className="mt-2 text-gray-600">
                Experience thrilling treks, safaris, and mountain expeditions.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2 text-center">
              <FaGlobeAsia className="text-5xl text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#2E4D38]">
                International Tours
              </h3>
              <p className="mt-2 text-gray-600">
                Travel beyond borders with curated global experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Blogs Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#2E4D38]">
              Latest Travel Stories
            </h2>
            <p className="text-gray-600 mt-2 text-lg">
              Get inspired for your next journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestBlogs.map((blog) => (
              <Link key={blog._id} to={`/blogs/${blog._id}`} className="group">
                <div className="bg-gray-50 rounded-2xl overflow-hidden transition group-hover:bg-white group-hover:shadow-xl border border-transparent group-hover:border-gray-100">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={
                        blog.image?.startsWith("/uploads/")
                          ? `${import.meta.env.VITE_IMAGE_URL}${blog.image}`
                          : blog.image
                      }
                      alt={blog.title}
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-xs font-bold text-green-700 uppercase tracking-wider mb-2">
                      {blog.category || "Travel"}
                    </div>
                    <h3 className="text-xl font-bold text-[#2E4D38] mb-3 group-hover:text-green-700 transition">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                      {blog.content.replace(/<[^>]*>?/gm, "")}
                    </p>
                    <div className="text-xs text-gray-400 font-medium">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-700 to-[#2E4D38] text-center text-white">
        <h2 className="text-4xl font-bold">Ready to Start Your Journey?</h2>
        <p className="mt-4 text-lg">
          Chat with our travel experts today and plan your dream vacation.
        </p>
        <a
          href="https://wa.me/919876543210"
          target="_blank"
          className="mt-6 inline-flex items-center justify-center bg-[#25D366] px-6 py-3 rounded-lg font-semibold hover:bg-[#1DA851] transition shadow-lg"
        >
          <FaWhatsapp className="h-6 w-6 mr-2" />
          Contact Us
        </a>
      </section>
    </div>
  );
}
