// src/components/InfoSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaHeart, FaComments, FaUserGraduate, FaChalkboardTeacher, FaBell } from 'react-icons/fa';

const InfoSection = () => {
  return (
    <div className="w-full py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with tuition centers, stay updated with their latest posts, and find the perfect fit for your learning journey
          </p>
        </div>

        {/* Feature Blocks */}
        <div className="space-y-24">
          
          {/* Block 1: For Students - Discover Tuitions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-8 text-white shadow-2xl">
                <FaSearch className="text-5xl mb-6 text-yellow-300" />
                <h3 className="text-3xl font-bold mb-4">Discover Tuition Centers</h3>
                <p className="text-lg text-blue-100 mb-6">
                  Search for top-rated tuition centers in your area. Browse through detailed profiles, 
                  read real-time updates, and find the perfect match for your academic goals.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-yellow-300 rounded-full"></span>
                    <span>Search by name or location</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-yellow-300 rounded-full"></span>
                    <span>View detailed tuition profiles</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-yellow-300 rounded-full"></span>
                    <span>Check ratings and reviews</span>
                  </li>
                </ul>
                <Link 
                  to="/all-tuitions"
                  className="inline-block bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition"
                >
                  Browse Tuitions →
                </Link>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="bg-white rounded-3xl p-8 shadow-xl border-4 border-blue-100">
                <FaUserGraduate className="text-8xl text-blue-600 mx-auto mb-4" />
                <div className="text-center">
                  <h4 className="text-2xl font-bold text-gray-800 mb-2">For Students</h4>
                  <p className="text-gray-600">Your learning journey starts here</p>
                </div>
              </div>
            </div>
          </div>

          {/* Block 2: Stay Updated with Feed */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-white rounded-3xl p-8 shadow-xl border-4 border-purple-100">
                <FaBell className="text-8xl text-purple-600 mx-auto mb-4" />
                <div className="text-center">
                  <h4 className="text-2xl font-bold text-gray-800 mb-2">Real-time Updates</h4>
                  <p className="text-gray-600">Never miss important announcements</p>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl p-8 text-white shadow-2xl">
                <FaHeart className="text-5xl mb-6 text-yellow-300" />
                <h3 className="text-3xl font-bold mb-4">Engage with Posts</h3>
                <p className="text-lg text-purple-100 mb-6">
                  Follow your favorite tuition centers. Like, comment on their posts, and stay connected 
                  with class updates, achievements, and important announcements.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-yellow-300 rounded-full"></span>
                    <span>Like and comment on updates</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-yellow-300 rounded-full"></span>
                    <span>Get notified about new posts</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-yellow-300 rounded-full"></span>
                    <span>Track your enrolled classes</span>
                  </li>
                </ul>
                <Link 
                  to="/feed"
                  className="inline-block bg-white text-purple-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition"
                >
                  View Feed →
                </Link>
              </div>
            </div>
          </div>

          {/* Block 3: For Tuition Owners */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-3xl p-8 text-white shadow-2xl">
                <FaChalkboardTeacher className="text-5xl mb-6 text-yellow-300" />
                <h3 className="text-3xl font-bold mb-4">For Tuition Owners</h3>
                <p className="text-lg text-green-100 mb-6">
                  Create posts about your classes, share achievements, announce new batches, and 
                  connect directly with students. Build your community and grow your tuition center.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-yellow-300 rounded-full"></span>
                    <span>Post updates and announcements</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-yellow-300 rounded-full"></span>
                    <span>Share student achievements</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-yellow-300 rounded-full"></span>
                    <span>Manage enrollments</span>
                  </li>
                </ul>
                <Link 
                  to="/login"
                  className="inline-block bg-white text-green-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition"
                >
                  Get Started →
                </Link>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="bg-white rounded-3xl p-8 shadow-xl border-4 border-green-100">
                <FaComments className="text-8xl text-green-600 mx-auto mb-4" />
                <div className="text-center">
                  <h4 className="text-2xl font-bold text-gray-800 mb-2">Grow Your Community</h4>
                  <p className="text-gray-600">Connect with students effectively</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white shadow-2xl">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students and tuition centers already using our platform
          </p>
          <Link
            to="/login"
            className="inline-block bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg"
          >
            Sign Up Now
          </Link>
        </div>

      </div>
    </div>
  );
};

export default InfoSection;