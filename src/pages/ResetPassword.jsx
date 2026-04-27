// src/pages/ResetPassword.jsx
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: form.password }),
        },
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setSuccess("Password reset successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthLayout
      title="Reset Your Password"
      subtitle="Enter your new password below to regain access"
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-600 text-center">{success}</p>}

        <div>
          <label className="block text-left text-gray-700">New Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full mt-2 px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Enter new password"
          />
        </div>

        <div>
          <label className="block text-left text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className="w-full mt-2 px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Confirm new password"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-[#2E4D38] text-white font-semibold rounded-lg hover:bg-yellow-500 hover:text-[#2E4D38] transition shadow-md"
        >
          Reset Password
        </button>

        <p className="text-center text-gray-600">
          Remembered your password?{" "}
          <Link
            to="/login"
            className="text-yellow-500 font-medium hover:text-yellow-600"
          >
            Back to Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
