// src/components/HeroSection.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUserType } from '../redux/authSlice';
import { FaSearch, FaUsers, FaGraduationCap } from 'react-icons/fa';

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('name'); // 'name' or 'location'
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userType = useSelector(selectUserType);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    // Navigate to all-tuitions with search params
    navigate(`/all-tuitions?${searchBy}=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div className="relative w-full min-h-[90vh] flex flex-col items-center justify-center text-white px-4 py-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center animate-[zoomIn_20s_ease-in-out_infinite_alternate]"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}hero-bg.jpg)` }}
      ></div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-indigo-900/75 to-purple-900/80"></div>
      
      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-2 h-2 bg-white/30 rounded-full animate-[float_6s_ease-in-out_infinite] top-[20%] left-[10%]"></div>
        <div className="absolute w-3 h-3 bg-blue-300/40 rounded-full animate-[float_8s_ease-in-out_infinite] top-[60%] left-[80%]"></div>
        <div className="absolute w-2 h-2 bg-purple-300/30 rounded-full animate-[float_7s_ease-in-out_infinite] top-[40%] left-[70%]"></div>
        <div className="absolute w-4 h-4 bg-white/20 rounded-full animate-[float_9s_ease-in-out_infinite] top-[80%] left-[20%]"></div>
        <div className="absolute w-2 h-2 bg-yellow-300/40 rounded-full animate-[float_5s_ease-in-out_infinite] top-[30%] left-[90%]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Main Heading */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight animate-[slideDown_0.8s_ease-out]">
            Find Your Perfect
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-400 animate-[shimmer_3s_ease-in-out_infinite]">
              Tuition Center
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto animate-[slideUp_0.8s_ease-out_0.2s_both]">
            Connect with top tuition centers, read updates, and enroll in classes that match your goals
          </p>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-[slideUp_0.8s_ease-out_0.4s_both]">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-pointer">
            <FaGraduationCap className="text-yellow-300 animate-bounce" />
            <span className="font-semibold">1000+ Tuition Centers</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-pointer">
            <FaUsers className="text-green-300 animate-pulse" />
            <span className="font-semibold">Real-time Updates</span>
          </div>
        </div>

        {/* Search Box */}
        <div className="max-w-2xl mx-auto mb-8">
          <form onSubmit={handleSearch} className="bg-white border-2 border-gray-300 rounded-lg shadow-sm p-2 hover:border-blue-600 transition-colors">
            <div className="flex flex-col md:flex-row gap-2">
              {/* Search Input */}
              <div className="flex-1 flex">
                <input
                  type="text"
                  placeholder="Search by tuition name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-4 py-3 text-gray-800 text-lg focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <FaSearch />
                  <span className="hidden md:inline">Search</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Quick Links */}
        <div className="flex justify-center gap-6 mb-8 text-sm">
          <Link
            to="/all-tuitions"
            className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
          >
            Browse All Tuitions
          </Link>
          <span className="text-gray-400">|</span>
          <Link
            to="/feed"
            className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
          >
            View Updates
          </Link>
        </div>

        {/* CTA Buttons */}
        {!isAuthenticated && (
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/login"
              className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors text-lg"
            >
              Get Started
            </Link>
            <Link
              to="/about"
              className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-blue-50 transition-colors text-lg"
            >
              Learn More
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
export default HeroSection;