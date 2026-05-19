import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, Users, MapPin, CreditCard, ChevronRight } from "lucide-react";
import MainLayout from "../layouts/MainLayout";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

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
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const cancelBooking = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/bookings/${id}/cancel`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) => (b._id === id ? { ...b, status: "cancelled" } : b))
        );
      } else {
        alert(data.message || "Failed to cancel booking");
      }
    } catch (err) {
      console.error("Error cancelling booking:", err);
      alert("Error cancelling booking");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "confirmed":
        return <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full border border-green-200">Confirmed</span>;
      case "pending":
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm font-semibold rounded-full border border-yellow-200">Pending</span>;
      case "cancelled":
        return <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-semibold rounded-full border border-red-200">Cancelled</span>;
      default:
        return <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full">{status}</span>;
    }
  };

  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen py-10 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Dashboard Header */}
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-4xl font-bold text-[#2E4D38]">My Bookings</h1>
            <p className="text-gray-500 mt-2">Manage your upcoming trips and travel history</p>
          </div>

          {message && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-center">
              {message}
            </div>
          )}

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-[#2E4D38] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : bookings.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-16 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-10 h-10 text-gray-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">No bookings yet</h2>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">You haven't booked any trips yet. Discover our amazing travel packages and start your adventure today!</p>
              <Link to="/packages" className="px-8 py-3 bg-[#2E4D38] text-white font-medium rounded-full hover:bg-yellow-500 hover:text-[#2E4D38] transition shadow-lg inline-block">
                Explore Packages
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {bookings.map((booking) => (
                <div key={booking._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition duration-300">
                  <div className="flex flex-col md:flex-row">
                    {/* Package Image */}
                    <div className="md:w-1/3 relative h-48 md:h-auto">
                      {booking.packageId?.image ? (
                        <img 
                          src={booking.packageId.image.startsWith("/uploads/") ? `${(import.meta.env.VITE_IMAGE_URL || import.meta.env.VITE_API_URL.replace('/api', ''))}${booking.packageId.image}` : booking.packageId.image} 
                          alt={booking.packageName} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400">No Image</span>
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        {getStatusBadge(booking.status)}
                      </div>
                    </div>

                    {/* Booking Details */}
                    <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h2 className="text-2xl font-bold text-gray-800">{booking.packageName}</h2>
                          <span className="text-sm text-gray-400 font-mono hidden md:block">#{booking._id.slice(-6).toUpperCase()}</span>
                        </div>
                        
                        {booking.packageId?.location && (
                          <div className="flex items-center text-gray-500 mb-4">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{booking.packageId.location}</span>
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-6 mt-4">
                          <div className="flex items-start">
                            <div className="bg-gray-100 p-2 rounded-lg mr-3">
                              <Calendar className="w-5 h-5 text-[#2E4D38]" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Date</p>
                              <p className="font-medium text-gray-800">{new Date(booking.date).toDateString()}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="bg-gray-100 p-2 rounded-lg mr-3">
                              <Users className="w-5 h-5 text-[#2E4D38]" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Travelers</p>
                              <p className="font-medium text-gray-800">{booking.travelers} {booking.travelers === 1 ? 'Person' : 'People'}</p>
                            </div>
                          </div>
                          
                          {booking.packageId?.price && (
                            <div className="flex items-start col-span-2 md:col-span-1">
                              <div className="bg-gray-100 p-2 rounded-lg mr-3">
                                <CreditCard className="w-5 h-5 text-[#2E4D38]" />
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Total Amount</p>
                                <p className="font-bold text-gray-800">₹{booking.packageId.price * booking.travelers}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                        {booking.packageId ? (
                          <Link to={`/packages/${booking.packageId._id}`} className="flex items-center text-[#2E4D38] font-medium hover:text-yellow-600 transition">
                            View Package <ChevronRight className="w-4 h-4 ml-1" />
                          </Link>
                        ) : (
                          <span className="text-gray-400 text-sm">Package unavailable</span>
                        )}
                        
                        {booking.status === "pending" && (
                          <button
                            onClick={() => cancelBooking(booking._id)}
                            className="px-5 py-2 text-sm font-semibold text-red-600 bg-red-50 rounded-full hover:bg-red-100 hover:text-red-700 transition"
                          >
                            Cancel Booking
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
