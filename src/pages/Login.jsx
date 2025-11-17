import { useState, useContext } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AuthLayout from "../layouts/AuthLayout";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      login(data.token, data.user);

      const redirect = params.get("redirect");
      if (redirect) {
        navigate(redirect);
      } else {
        navigate(
          data.user?.role === "admin" ? "/admin/dashboard" : "/bookings"
        );
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login to manage your bookings and explore new trips"
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && <p className="text-red-500 text-center">{error}</p>}

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
            placeholder="Enter password"
          />
        </div>

        <p className="text-right">
          <Link
            to="/forgot-password"
            className="text-sm text-yellow-500 hover:text-yellow-600 font-medium"
          >
            Forgot Password?
          </Link>
        </p>

        <button
          type="submit"
          className="w-full py-3 bg-[#2E4D38] text-white font-semibold rounded-lg hover:bg-yellow-500 hover:text-[#2E4D38] transition shadow-md"
        >
          Login
        </button>

        <p className="text-center text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-yellow-500 font-medium hover:text-yellow-600"
          >
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
