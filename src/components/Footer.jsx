import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#1A365D] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Altura Travels</h3>
            <p className="text-gray-300 mb-4">
              Discover the beauty of North India with our expertly curated travel experiences.
            </p>
            <div className="flex space-x-3 mt-6">
              <a href="https://www.instagram.com/thealturatravels/" target="_blank" rel="noopener noreferrer" 
                className="bg-white text-[#1A365D] p-2 rounded-full hover:bg-gray-200 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61577203546031" target="_blank" rel="noopener noreferrer" 
                className="bg-white text-[#1A365D] p-2 rounded-full hover:bg-gray-200 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="http://linkedin.com/in/altura-travels-a9b0b5373/" target="_blank" rel="noopener noreferrer" 
                className="bg-white text-[#1A365D] p-2 rounded-full hover:bg-gray-200 transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/packages" className="text-gray-300 hover:text-white transition-colors">Tour Packages</Link></li>
              <li><Link to="/blogs" className="text-gray-300 hover:text-white transition-colors">Travel Blogs</Link></li>
              <li><Link to="/enquiry" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 mt-1 flex-shrink-0" size={18} />
                <span className="text-gray-300">Sector 11, Rohini, New Delhi, 110085</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 flex-shrink-0" size={18} />
                <a href="tel:+919876543210" className="text-gray-300 hover:text-white transition-colors">+91 98765 43210</a>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 flex-shrink-0" size={18} />
                <a href="mailto:travelsaltura@gmail.com" className="text-gray-300 hover:text-white transition-colors">travelsaltura@gmail.com</a>
              </li>
              <li className="flex items-center">
                <Clock className="mr-2 flex-shrink-0" size={18} />
                <span className="text-gray-300">Mon-Sat: 9:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-6 bg-[#0F2A4A]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Altura Travels. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0 text-sm text-gray-400">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
