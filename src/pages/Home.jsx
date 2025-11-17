import Navbar from "../components/Navbar"; // Make sure path is correct
import { FaMapMarkedAlt, FaUmbrellaBeach, FaMountain, FaGlobeAsia } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

export default function Home() {
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
            Explore exclusive packages, colorful adventures, and unforgettable journeys across India.
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
            At Altura Travels, we believe travel is not just about destinations, but about experiences.
            Whether you seek luxury, adventure, or relaxation, we design trips that create lifelong memories.
            Join us and explore the world like never before.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-[#2E4D38] relative inline-block">
            Our Services
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-yellow-400 rounded-full"></span>
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-gradient-to-t from-green-50 to-white rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2 text-center">
              <FaMapMarkedAlt className="text-5xl text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#2E4D38]">Guided Tours</h3>
              <p className="mt-2 text-gray-600">Explore new places with expert guides and personalized itineraries.</p>
            </div>
            <div className="p-6 bg-gradient-to-t from-green-50 to-white rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2 text-center">
              <FaUmbrellaBeach className="text-5xl text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#2E4D38]">Beach Holidays</h3>
              <p className="mt-2 text-gray-600">Relax on serene beaches with luxury resorts and water sports.</p>
            </div>
            <div className="p-6 bg-gradient-to-t from-green-50 to-white rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2 text-center">
              <FaMountain className="text-5xl text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#2E4D38]">Adventure Trips</h3>
              <p className="mt-2 text-gray-600">Experience thrilling treks, safaris, and mountain expeditions.</p>
            </div>
            <div className="p-6 bg-gradient-to-t from-green-50 to-white rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2 text-center">
              <FaGlobeAsia className="text-5xl text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#2E4D38]">International Tours</h3>
              <p className="mt-2 text-gray-600">Travel beyond borders with curated global experiences.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-700 to-[#2E4D38] text-center text-white">
        <h2 className="text-4xl font-bold">Ready to Start Your Journey?</h2>
        <p className="mt-4 text-lg">Chat with our travel experts today and plan your dream vacation.</p>
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
