// src/pages/PrivacyPolicy.jsx
import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-[#2E4D38] mb-6">Privacy Policy</h1>
      <p className="text-gray-700 mb-4">
        Altura Travels respects your privacy. This policy explains what data we collect, why we
        collect it, and how we use and protect it.
      </p>

      <h2 className="text-2xl font-semibold text-[#2E4D38] mt-8 mb-3">Information We Collect</h2>
      <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li>Contact details such as name, email, and phone number.</li>
        <li>Booking details including selected package, travel dates, and number of travelers.</li>
        <li>Authentication details for login and account management.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-[#2E4D38] mt-8 mb-3">How We Use Your Information</h2>
      <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li>To process bookings and provide requested services.</li>
        <li>To communicate updates, confirmations, and support.</li>
        <li>To improve our offerings and website experience.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-[#2E4D38] mt-8 mb-3">Data Protection</h2>
      <p className="text-gray-700">
        We implement reasonable technical and organizational measures to protect your data from
        unauthorized access, disclosure, alteration, or destruction.
      </p>

      <h2 className="text-2xl font-semibold text-[#2E4D38] mt-8 mb-3">Third-Party Services</h2>
      <p className="text-gray-700">
        We may use trusted third-party providers (e.g., payment gateways) to facilitate services. They
        are obligated to protect your information and only use it as instructed by us.
      </p>

      <h2 className="text-2xl font-semibold text-[#2E4D38] mt-8 mb-3">Your Rights</h2>
      <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li>Access, correction, or deletion of your personal data.</li>
        <li>Opt-out of non-essential communications.</li>
      </ul>

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