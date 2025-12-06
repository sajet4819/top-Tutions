// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaHeart
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <h2 className="text-4xl font-bold">
                Top<span className="text-blue-400">Tuitions</span>
              </h2>
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              India's leading platform to discover and connect with top tuition centers. 
              Find the perfect coaching for your academic success.
            </p>
            {/* Social Media Icons */}
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition backdrop-blur-sm"
                aria-label="Facebook"
              >
                <FaFacebook className="text-lg" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition backdrop-blur-sm"
                aria-label="Twitter"
              >
                <FaTwitter className="text-lg" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition backdrop-blur-sm"
                aria-label="Instagram"
              >
                <FaInstagram className="text-lg" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition backdrop-blur-sm"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-lg" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-300">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white hover:translate-x-1 inline-flex items-center transition">
                  → Home
                </Link>
              </li>
              <li>
                <Link to="/all-tuitions" className="text-gray-300 hover:text-white hover:translate-x-1 inline-flex items-center transition">
                  → Browse Tuitions
                </Link>
              </li>
              <li>
                <Link to="/feed" className="text-gray-300 hover:text-white hover:translate-x-1 inline-flex items-center transition">
                  → Feed
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white hover:translate-x-1 inline-flex items-center transition">
                  → About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* For Students & Owners */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-purple-300">For Users</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white hover:translate-x-1 inline-flex items-center transition">
                  → Student Login
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white hover:translate-x-1 inline-flex items-center transition">
                  → Tuition Owner Login
                </Link>
              </li>
              <li>
                <Link to="/student-dashboard" className="text-gray-300 hover:text-white hover:translate-x-1 inline-flex items-center transition">
                  → Student Dashboard
                </Link>
              </li>
              <li>
                <Link to="/tuition-dashboard" className="text-gray-300 hover:text-white hover:translate-x-1 inline-flex items-center transition">
                  → Tuition Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-pink-300">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-300">
                <FaMapMarkerAlt className="text-blue-400 mt-1 flex-shrink-0" />
                <span>Mumbai, Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <FaPhone className="text-green-400 flex-shrink-0" />
                <span>+91 9876543210</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <FaEnvelope className="text-purple-400 flex-shrink-0" />
                <span>contact@toptuitions.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-gray-400 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} TopTuitions. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex gap-6 text-sm text-gray-400">
              <Link to="/terms" className="hover:text-white transition">
                Terms & Conditions
              </Link>
              <Link to="/privacy" className="hover:text-white transition">
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Developer Credit */}
          <div className="text-center mt-6 pt-6 border-t border-white/10">
            <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
              Designed and Developed with <FaHeart className="text-red-500 animate-pulse" /> by{' '}
              <span className="text-blue-400 font-semibold">Sajet Dhopare</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;