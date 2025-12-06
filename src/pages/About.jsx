// src/pages/About.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaRocket, 
  FaUsers, 
  FaHeart, 
  FaLightbulb,
  FaCheckCircle,
  FaEnvelope,
  FaQuestionCircle,
  FaChartLine
} from 'react-icons/fa';

const About = () => {
  const features = [
    {
      icon: <FaUsers className="text-4xl text-blue-600" />,
      title: 'Community Driven',
      description: 'Built by students, for students. Share and discover authentic experiences from real users.'
    },
    {
      icon: <FaHeart className="text-4xl text-red-500" />,
      title: 'Transparent Reviews',
      description: 'Honest feedback and ratings to help you make informed decisions about your education.'
    },
    {
      icon: <FaRocket className="text-4xl text-purple-600" />,
      title: 'Easy to Use',
      description: 'Simple, intuitive platform designed to help you find the perfect tuition center quickly.'
    },
    {
      icon: <FaChartLine className="text-4xl text-green-600" />,
      title: 'Real-time Updates',
      description: 'Stay connected with latest posts, achievements, and announcements from tuition centers.'
    }
  ];

  const values = [
    { icon: <FaCheckCircle className="text-green-500" />, text: 'Transparency in education' },
    { icon: <FaCheckCircle className="text-green-500" />, text: 'Empowering student choices' },
    { icon: <FaCheckCircle className="text-green-500" />, text: 'Building trust through reviews' },
    { icon: <FaCheckCircle className="text-green-500" />, text: 'Supporting quality education' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      
      {/* Hero Section with Background Image */}
      <div className="relative w-full h-96 overflow-hidden">
        {/* Background Image */}
        <img
          src={`${import.meta.env.BASE_URL}images/blog-bg.png`}
          alt="About TopTuitions"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/50 to-black/60"></div>
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-[slideDown_0.6s_ease-out]">
            About TopTuitions
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl animate-[slideUp_0.6s_ease-out]">
            Connecting students with the best tuition centers across India
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        
        {/* Mission Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-16 border border-gray-100">
          <div className="text-center mb-8">
            <FaLightbulb className="text-6xl text-yellow-500 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Mission</h2>
          </div>
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              At <span className="font-bold text-blue-600">TopTuitions</span>, we believe that finding the right tuition center 
              plays a crucial role in shaping your education. That's why we've built a platform where students can 
              discover, connect, and engage with top coaching institutes across India.
            </p>
            <p>
              Our goal is to create a transparent ecosystem where students can read real-time updates, 
              genuine reviews, and make informed decisions about their academic journey. We're not just a directory – 
              we're a <span className="font-semibold text-purple-600">social platform</span> that brings students and 
              tuition centers together.
            </p>
            <p>
              Whether you're preparing for JEE, NEET, or any competitive exam, TopTuitions helps you find the 
              perfect coaching that matches your goals and learning style.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Why Choose TopTuitions?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Values */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl shadow-2xl p-8 md:p-12 mb-16 text-white">
          <h2 className="text-4xl font-bold text-center mb-8">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div key={index} className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="text-3xl">{value.icon}</div>
                <p className="text-lg font-semibold">{value.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center border-t-4 border-blue-500">
            <h3 className="text-4xl font-bold text-gray-800 mb-2">1000+</h3>
            <p className="text-gray-600 font-medium">Tuition Centers</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center border-t-4 border-purple-500">
            <h3 className="text-4xl font-bold text-gray-800 mb-2">50K+</h3>
            <p className="text-gray-600 font-medium">Active Students</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center border-t-4 border-green-500">
            <h3 className="text-4xl font-bold text-gray-800 mb-2">15+</h3>
            <p className="text-gray-600 font-medium">Cities</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center border-t-4 border-orange-500">
            <h3 className="text-4xl font-bold text-gray-800 mb-2">4.8★</h3>
            <p className="text-gray-600 font-medium">Avg Rating</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl shadow-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students already using TopTuitions to find their perfect coaching
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/all-tuitions"
              className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition shadow-lg"
            >
              Browse Tuitions
            </Link>
            <Link
              to="/login"
              className="bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/30 transition border-2 border-white/30"
            >
              Sign Up Now
            </Link>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <FaQuestionCircle className="text-4xl text-blue-600" />
              <h3 className="text-2xl font-bold text-gray-800">Have Questions?</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Visit our help page for answers to common questions and detailed guides on how to use TopTuitions.
            </p>
            <Link
              to="/help"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Visit Help Center
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <FaEnvelope className="text-4xl text-purple-600" />
              <h3 className="text-2xl font-bold text-gray-800">Contact Us</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Have feedback or need support? We'd love to hear from you! Drop us an email anytime.
            </p>
            <a
              href="mailto:contact@toptuitions.com"
              className="inline-block bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;