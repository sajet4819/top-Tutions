// src/components/CTASection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUserType } from '../redux/authSlice';
import { FaRocket, FaUserGraduate, FaChalkboardTeacher, FaArrowRight } from 'react-icons/fa';

const CTASection = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userType = useSelector(selectUserType);

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {!isAuthenticated ? (
          // CTA for Non-Authenticated Users
          <div className="text-center">
            <FaRocket className="text-7xl text-yellow-300 mx-auto mb-6 animate-bounce" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto">
              Join thousands of students and tuition centers already using our platform to achieve their goals
            </p>

            {/* Two CTA Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Student CTA */}
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border-2 border-white/20 hover:bg-white/20 transition-all duration-300">
                <FaUserGraduate className="text-6xl text-yellow-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-3">For Students</h3>
                <p className="text-blue-100 mb-6">
                  Discover top tuition centers, read updates, and enroll in classes that match your goals
                </p>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg"
                >
                  Join as Student
                  <FaArrowRight />
                </Link>
              </div>

              {/* Tuition Owner CTA */}
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border-2 border-white/20 hover:bg-white/20 transition-all duration-300">
                <FaChalkboardTeacher className="text-6xl text-green-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-3">For Tuition Owners</h3>
                <p className="text-blue-100 mb-6">
                  Create posts, share achievements, and connect with students to grow your tuition center
                </p>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-teal-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-teal-600 transition-all duration-300 shadow-lg"
                >
                  Join as Owner
                  <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
        ) : (
          // CTA for Authenticated Users
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {userType === 'student' 
                ? 'Keep Exploring and Learning! 🚀' 
                : 'Keep Growing Your Community! 🌟'}
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto">
              {userType === 'student'
                ? 'Discover more tuition centers, engage with posts, and find the perfect classes for your academic goals'
                : 'Share more updates, connect with students, and build a thriving learning community'}
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              {userType === 'student' ? (
                <>
                  <Link
                    to="/feed"
                    className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg"
                  >
                    Explore Feed
                    <FaArrowRight />
                  </Link>
                  <Link
                    to="/all-tuitions"
                    className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300 border-2 border-white/30"
                  >
                    Browse Tuitions
                    <FaArrowRight />
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/create-post"
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 shadow-lg"
                  >
                    Create New Post
                    <FaArrowRight />
                  </Link>
                  <Link
                    to="/tuition-dashboard"
                    className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg"
                  >
                    Go to Dashboard
                    <FaArrowRight />
                  </Link>
                </>
              )}
            </div>
          </div>
        )}

        {/* Trust Badge */}
        <div className="mt-16 text-center">
          <p className="text-blue-200 text-sm">
            Trusted by <span className="font-bold text-white">50,000+ students</span> and <span className="font-bold text-white">1,000+ tuition centers</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;