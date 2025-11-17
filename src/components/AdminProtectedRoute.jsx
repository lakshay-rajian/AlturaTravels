// src/components/AdminProtectedRoute.jsx
import { Navigate } from "react-router-dom";

export default function AdminProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  if (!token || !user || user.role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
