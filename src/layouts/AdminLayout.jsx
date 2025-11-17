import { Outlet, Link } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-[#2E4D38] text-white py-4">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <Link to="/admin/login" className="text-xl font-bold">
            Altura Admin
          </Link>
          <nav className="space-x-4">
            <Link to="/admin/login" className="hover:text-yellow-400">
              Login
            </Link>
            <Link to="/admin/dashboard" className="hover:text-yellow-400">
              Dashboard
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
