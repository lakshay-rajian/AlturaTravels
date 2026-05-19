import { Link, useParams } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import MainLayout from "../layouts/MainLayout";

export default function BookingSuccess() {
  const { id } = useParams();

  return (
    <MainLayout>
      <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-6 py-12">
        <div className="bg-white rounded-3xl shadow-xl p-10 md:p-16 max-w-lg w-full text-center border border-gray-100 relative overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-[-20%] left-[-20%] w-48 h-48 bg-green-100 rounded-full mix-blend-multiply filter blur-2xl opacity-50"></div>
          <div className="absolute bottom-[-20%] right-[-20%] w-48 h-48 bg-yellow-100 rounded-full mix-blend-multiply filter blur-2xl opacity-50"></div>

          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 p-4 rounded-full">
                <CheckCircle className="w-16 h-16 text-green-500" />
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-[#2E4D38] mb-4">
              Booking Confirmed!
            </h1>
            
            <p className="text-gray-600 text-lg mb-6">
              Thank you for choosing Altura Travels. Your booking request has been successfully received.
            </p>

            <div className="bg-gray-50 rounded-xl p-4 mb-8 border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Booking Reference</p>
              <p className="font-mono font-bold text-gray-800 text-lg">#{id.slice(-8).toUpperCase()}</p>
            </div>

            <p className="text-gray-500 text-sm mb-8">
              We have sent a confirmation email with all the details. Our travel experts will contact you shortly to finalize your itinerary!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/my-bookings"
                className="px-6 py-3 bg-[#2E4D38] text-white font-medium rounded-full hover:bg-[#24402e] transition shadow-md w-full sm:w-auto"
              >
                View My Bookings
              </Link>
              <Link
                to="/"
                className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-full hover:bg-gray-200 transition w-full sm:w-auto"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
