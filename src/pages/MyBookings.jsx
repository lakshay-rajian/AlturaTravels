// src/pages/MyBookings.jsx
import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch user's bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${import.meta.env.VITE_API_URL}/bookings/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (res.ok) {
          setBookings(data);
        } else {
          setMessage(data.message || "Failed to fetch bookings");
        }
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setMessage("Error fetching bookings");
      }
    };

    fetchBookings();
  }, []);

  // Cancel a booking
  const cancelBooking = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/bookings/${id}/cancel`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) =>
            b._id === id ? { ...b, status: "cancelled" } : b
          )
        );
        setMessage("Booking cancelled successfully ✅");
      } else {
        setMessage(data.message || "Failed to cancel booking");
      }
    } catch (err) {
      console.error("Error cancelling booking:", err);
      setMessage("Error cancelling booking");
    }
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">My Bookings</h1>

        {message && (
          <p className="mb-4 text-center text-green-600 font-medium">{message}</p>
        )}

        {bookings.length === 0 ? (
          <p className="text-center text-gray-500">No bookings found</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="p-4 border rounded-lg shadow-sm flex justify-between items-center"
              >
                <div>
                  <h2 className="text-xl font-semibold">{booking.packageName}</h2>
                  <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
                  <p>Status: <span className="font-medium">{booking.status}</span></p>
                  <p>Travelers: {booking.travelers}</p>
                </div>

                {booking.status === "pending" && (
                  <button
                    onClick={() => cancelBooking(booking._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    Cancel
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
