import { useState } from "react";
import AuthLayout from "../layouts/AuthLayout";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send reset email");

      setMessage("✅ Reset link sent! Check your inbox.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your registered email to reset your password"
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {message && <p className="text-green-600 text-center">{message}</p>}

        <div>
          <label className="block text-left text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full mt-2 px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="you@example.com"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-[#2E4D38] hover:text-white transition shadow-md"
        >
          Send Reset Link
        </button>

        <p className="text-center text-gray-600">
          Remembered your password?{" "}
          <a
            href="/login"
            className="text-[#2E4D38] font-medium hover:text-yellow-600"
          >
            Back to Login
          </a>
        </p>
      </form>
    </AuthLayout>
  );
}
