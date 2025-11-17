import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AuthLayout from "../layouts/AuthLayout";

export default function Signup() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      login(data.token, data.role);

      navigate(data.role === "admin" ? "/admin" : "/bookings");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthLayout title="Create Account " subtitle="Join Altura Travels and start booking your dream trips today">
      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && <p className="text-red-500 text-center">{error}</p>}

        <div>
          <label className="block text-left text-gray-700">Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full mt-2 px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block text-left text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full mt-2 px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-left text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full mt-2 px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-[#2E4D38] text-white font-semibold rounded-lg hover:bg-yellow-500 hover:text-[#2E4D38] transition shadow-md"
        >
          Sign Up
        </button>

        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-yellow-500 font-medium hover:text-yellow-600"
          >
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
