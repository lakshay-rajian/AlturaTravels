// src/pages/TermsOfService.jsx
import { Link } from "react-router-dom";

export default function TermsOfService() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-[#2E4D38] mb-6">Terms of Service</h1>
      <p className="text-gray-700 mb-4">
        These terms govern your use of Altura Travels’ website and services. By using our site or
        booking a package, you agree to these terms.
      </p>

      <h2 className="text-2xl font-semibold text-[#2E4D38] mt-8 mb-3">Bookings & Payments</h2>
      <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li>All bookings are subject to availability and confirmation.</li>
        <li>Prices may vary based on seasonality, availability, and group size.</li>
        <li>Deposits or full payment may be required to confirm bookings.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-[#2E4D38] mt-8 mb-3">Cancellations & Refunds</h2>
      <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li>Cancellation policies vary by package and supplier.</li>
        <li>Refunds, if applicable, follow the specific package policy.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-[#2E4D38] mt-8 mb-3">User Conduct</h2>
      <p className="text-gray-700">
        You agree not to misuse the website, interfere with services, or engage in activities that
        harm other users or our business.
      </p>

      <h2 className="text-2xl font-semibold text-[#2E4D38] mt-8 mb-3">Liability</h2>
      <p className="text-gray-700">
        Altura Travels is not liable for delays, cancellations, or incidents beyond our reasonable
        control, including those related to third-party providers.
      </p>

      <p className="text-gray-700 mt-8">
        For questions, contact us at <a href="mailto:travelsaltura@gmail.com" className="text-[#1A365D] underline">travelsaltura@gmail.com</a>.
      </p>

      <div className="mt-10">
        <Link to="/" className="px-4 py-2 bg-[#2E4D38] text-white rounded-lg hover:bg-[#24402e] transition">
          Back to Home
        </Link>
      </div>
    </div>
  );
}