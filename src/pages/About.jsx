// src/pages/About.jsx
export default function About() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[50vh]"
        style={{ backgroundImage: "url('/about-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white">
          <h1 className="text-5xl font-bold drop-shadow-lg">About Us</h1>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-10">
          <h2 className="text-3xl font-bold text-[#2E4D38] mb-6">Who We Are</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            At <span className="font-semibold text-[#2E4D38]">Altura Travels</span>,
            we believe travel is not just about destinations, it's about
            experiences. Founded in 2018, we've quickly become North India's premier 
            travel company specializing in curated experiences that blend adventure, 
            luxury, and cultural immersion.
          </p>
          
          <h3 className="text-2xl font-bold text-[#2E4D38] mb-4 mt-8">Our Mission</h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            Our mission is to transform ordinary trips into extraordinary journeys. 
            We strive to create travel experiences that not only showcase the beauty 
            of destinations but also connect travelers with local cultures, traditions, 
            and people in meaningful ways.
          </p>
          
          <h3 className="text-2xl font-bold text-[#2E4D38] mb-4 mt-8">What Sets Us Apart</h3>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-green-50 p-5 rounded-lg">
              <h4 className="font-bold text-[#2E4D38] mb-2">Personalized Experiences</h4>
              <p className="text-gray-700">From luxury getaways to adventurous group trips, our 
              packages are tailored to match your travel style and preferences.</p>
            </div>
            <div className="bg-green-50 p-5 rounded-lg">
              <h4 className="font-bold text-[#2E4D38] mb-2">Local Expertise</h4>
              <p className="text-gray-700">Our team of local experts ensures you experience 
              authentic culture, cuisine, and hidden gems off the tourist trail.</p>
            </div>
            <div className="bg-green-50 p-5 rounded-lg">
              <h4 className="font-bold text-[#2E4D38] mb-2">Responsible Tourism</h4>
              <p className="text-gray-700">We're committed to sustainable travel practices that 
              respect local communities and preserve natural environments.</p>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-[#2E4D38] mb-4 mt-8">Our Specialties</h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            Whether you're a bachelor looking for fun, a retired individual
            wanting peaceful retreats, or someone who loves exploring new
            places with like-minded travelers, we have the perfect trip for you.
          </p>
          <ul className="list-disc pl-6 mb-8 text-gray-700 space-y-2">
            <li><span className="font-semibold">Himalayan Adventures</span> - Trek through majestic mountains and experience breathtaking views</li>
            <li><span className="font-semibold">Cultural Immersions</span> - Explore ancient temples, vibrant festivals, and traditional villages</li>
            <li><span className="font-semibold">Luxury Retreats</span> - Indulge in premium accommodations and exclusive experiences</li>
            <li><span className="font-semibold">Group Expeditions</span> - Join fellow travelers on carefully curated journeys</li>
            <li><span className="font-semibold">Custom Itineraries</span> - Let us design your dream vacation from scratch</li>
          </ul>
          
          <p className="text-gray-700 leading-relaxed font-medium">
            Based in North India, we specialize in Himalayan escapes, cultural
            tours, and luxury vacations that are{" "}
            <strong className="text-[#2E4D38]">budget-friendly</strong>,{" "}
            <strong className="text-[#2E4D38]">safe</strong>, and{" "}
            <strong className="text-[#2E4D38]">full of adventure</strong>.
          </p>
        </div>
      </section>
    </>
  );
}
