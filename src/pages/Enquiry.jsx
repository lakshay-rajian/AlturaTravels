// src/pages/Enquiry.jsx
import { useState } from "react";
import axios from "axios";

export default function Enquiry() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/enquiries`, form);
      setStatus("Thanks! We have received your enquiry.");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setStatus("Failed to submit. Please try again.");
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[50vh] flex flex-col items-center justify-center bg-gradient-to-t from-[#2E4D38] to-[#12311f] overflow-hidden">
        {/* Vibrant Contrast Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-[-10%] right-[10%] w-96 h-96 bg-fuchsia-500 rounded-full mix-blend-screen filter blur-[100px] opacity-60 animate-pulse"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-80 h-80 bg-orange-500 rounded-full mix-blend-screen filter blur-[120px] opacity-40"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6 mt-10">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] text-white">Have an Enquiry?</h1>
          <div className="w-32 h-1.5 bg-fuchsia-400 mt-6 rounded-full shadow-[0_0_15px_rgba(217,70,239,0.8)]"></div>
          <p className="mt-6 text-lg md:text-xl text-gray-100 font-medium max-w-2xl drop-shadow-md">
            Get in touch with us and we’ll help you plan your next trip.
          </p>
        </div>
      </section>

      {/* Enquiry Form Section */}
      <section className="py-16 px-6 bg-gray-50 relative z-10">
        <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-[#2E4D38] mb-8 text-center">
            Send us your Enquiry
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="relative">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full p-3 pl-4 border rounded-lg focus:ring-2 focus:ring-green-600"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="w-full p-3 pl-4 border rounded-lg focus:ring-2 focus:ring-green-600"
              />
            </div>

            {/* Phone */}
            <div className="relative">
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Your Phone"
                required
                className="w-full p-3 pl-4 border rounded-lg focus:ring-2 focus:ring-green-600"
              />
            </div>

            {/* Message */}
            <div className="relative">
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows="4"
                required
                className="w-full p-3 pl-4 border rounded-lg focus:ring-2 focus:ring-green-600"
              ></textarea>
            </div>

            {/* Submit */}
            <div className="text-center">
              <button
                type="submit"
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
              >
                Send Enquiry
              </button>
              {status && <p className="mt-3 text-sm text-gray-700">{status}</p>}
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
