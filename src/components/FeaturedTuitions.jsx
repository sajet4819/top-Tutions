// src/components/FeaturedTuitions.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { tuitions, getTuitionImage } from '../data/tuitions';
import { FaStar, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';

const FeaturedTuitions = () => {
  // Get top 12 tuitions by rating
  const featuredTuitions = tuitions
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 12);

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Top Rated Tuition Centers
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore highly-rated tuition centers trusted by thousands of students
          </p>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {featuredTuitions.map((tuition) => (
            <Link
              key={tuition.id}
              to={`/tuition/${tuition.id}`}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
                <img
                  src={getTuitionImage(tuition.id)}
                  alt={tuition.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                  <FaStar className="text-yellow-500 text-sm" />
                  <span className="font-bold text-gray-800">{tuition.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {tuition.name}
                </h3>
                <p className="text-gray-600 flex items-center gap-2 text-sm mb-4">
                  <FaMapMarkerAlt className="text-blue-600" />
                  {tuition.location}
                </p>
                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center gap-2">
                  View Details
                  <FaArrowRight className="text-sm" />
                </button>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden relative">
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {featuredTuitions.map((tuition) => (
              <Link
                key={tuition.id}
                to={`/tuition/${tuition.id}`}
                className="flex-shrink-0 w-[280px] snap-center bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
                  <img
                    src={getTuitionImage(tuition.id)}
                    alt={tuition.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                    <FaStar className="text-yellow-500 text-sm" />
                    <span className="font-bold text-gray-800">{tuition.rating}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-base font-bold text-gray-800 mb-2 line-clamp-2">
                    {tuition.name}
                  </h3>
                  <p className="text-gray-600 flex items-center gap-2 text-sm mb-3">
                    <FaMapMarkerAlt className="text-blue-600" />
                    {tuition.location}
                  </p>
                  <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-xl font-semibold text-sm">
                    View Details
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/all-tuitions"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Explore All Tuition Centers
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTuitions;