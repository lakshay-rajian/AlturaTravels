// src/pages/Blogs.jsx
  import { useState } from "react";
  import { Link } from "react-router-dom";
  import { Search } from "lucide-react"; // modern search icon
  import Navbar from "../components/Navbar"; // adjust path if needed

  const blogs = [
    {
      id: "himalayas",
      title: "Exploring the Himalayas: A Journey to the Roof of the World",
      excerpt:
        "Discover the adventure, spirituality, and breathtaking beauty of the world's highest mountain range...",
      image: "/blogs/blog-images.svg#himalayas-trek",
      category: "Adventure",
      author: "Priya Sharma",
      date: "June 15, 2023",
      readTime: "8 min read"
    },
    {
      id: "rajasthan",
      title: "Royal Rajasthan: The Land of Maharajas and Living Heritage",
      excerpt:
        "Experience the royal heritage, vibrant culture, and desert adventures in India's most colorful state...",
      image: "/blogs/blog-images.svg#rajasthan-fort",
      category: "Luxury",
      author: "Vikram Singh",
      date: "July 22, 2023",
      readTime: "7 min read"
    },
    {
      id: "kerala",
      title: "Backwaters of Kerala: Navigating God's Own Country",
      excerpt:
        "Float through serene backwaters, explore lush hill stations, and experience the rich cultural tapestry of God's Own Country...",
      image: "/blogs/blog-images.svg#kerala-backwaters",
      category: "Nature",
      author: "Anita Thomas",
      date: "August 10, 2023",
      readTime: "6 min read"
    },
    {
      id: "ladakh",
      title: "Adventures in Ladakh: The Land of High Passes",
      excerpt:
        "Embark on thrilling adventures through dramatic landscapes, ancient monasteries, and unique cultural experiences in India's Himalayan desert...",
      image: "/blogs/blog-images.svg#ladakh-mountains",
      category: "Adventure",
      author: "Tenzin Dorje",
      date: "September 5, 2023",
      readTime: "9 min read"
    },
    {
      id: "goa",
      title: "Beach Life in Goa: Where the Sun, Sand, and Celebration Never End",
      excerpt:
        "Discover the perfect blend of golden beaches, Portuguese heritage, delectable cuisine, and vibrant nightlife in India's favorite coastal paradise...",
      image: "/blogs/blog-images.svg#goa-beaches",
      category: "Luxury",
      author: "Maria D'Souza",
      date: "October 12, 2023",
      readTime: "7 min read"
    },
  ];

  const categories = ["All", "Adventure", "Luxury", "Nature"];

  export default function Blogs() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredBlogs = blogs.filter((blog) => {
      const matchesCategory =
        selectedCategory === "All" || blog.category === selectedCategory;
      const matchesSearch = blog.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    return (
      <div>
              <Navbar />          {/* <-- add this */}
              <div className="h20"></div> {/* spacer for fixed navbar */}


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
          {filteredBlogs.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-10">
              {filteredBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2"
                >
                  {/* Blog Image */}
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-52 object-cover rounded-t-xl"
                  />

                  {/* Blog Content */}
                  <div className="p-5">
                    <span className="text-sm font-medium text-[#2E4D38] bg-[#2E4D38]/10 px-3 py-1 rounded-full">
                      {blog.category}
                    </span>
                    <h2 className="text-2xl font-semibold text-gray-800 mt-2">
                      {blog.title}
                    </h2>
                    <p className="text-gray-600 mt-3">{blog.excerpt}</p>
                    
                    {/* Author and Read Time */}
                    <div className="flex items-center mt-4 text-sm text-gray-500">
                      <span className="font-medium">{blog.author}</span>
                      <span className="mx-2">•</span>
                      <span>{blog.date}</span>
                      <span className="mx-2">•</span>
                      <span>{blog.readTime}</span>
                    </div>

                    {/* Read More Button */}
                    <Link to={`/blogs/${blog.id}`}>
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
