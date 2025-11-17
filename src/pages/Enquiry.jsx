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
      await axios.post("http://localhost:5000/api/enquiries", form);
      setStatus("Thanks! We have received your enquiry.");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setStatus("Failed to submit. Please try again.");
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/enquiry-hero.jpg')" }}
        ></div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Text */}
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
            Have an Enquiry?
          </h1>
          <p className="mt-3 text-lg max-w-2xl mx-auto">
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
