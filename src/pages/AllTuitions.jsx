// src/pages/AllTuitions.jsx
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { tuitions, getTuitionImage, tuitionImages } from '../data/tuitions';
const AllTuitions = () => {
  const [search, setSearch] = useState('');
  const [locationFilter, setLocationFilter] = useState('All');
  const [sortBy, setSortBy] = useState('rating'); // rating | name-asc | name-desc

  // Get unique locations
  const locations = ['All', ...new Set(tuitions.map(t => t.location))];

  // Filtered & Sorted Data
  const filteredTuitions = useMemo(() => {
    let result = tuitions;

    // Search by name
    if (search) {
      result = result.filter(t =>
        t.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by location
    if (locationFilter !== 'All') {
      result = result.filter(t => t.location === locationFilter);
    }

    // Sort
    result = [...result].sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      return 0;
    });

    return result;
  }, [search, locationFilter, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-16 pb-20 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Small Beautiful Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
          Top Tuition Classes in India
        </h1>

        {/* Search + Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-5 mb-8 space-y-4">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search tuition name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-blue-500 text-sm"
          />

          <div className="flex flex-wrap gap-3">
            {/* Location Filter */}
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="px-4 py-2 rounded-xl border border-gray-300 text-sm font-medium focus:outline-none focus:border-blue-500"
            >
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc === 'All' ? 'All Locations' : loc}</option>
              ))}
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-xl border border-gray-300 text-sm font-medium focus:outline-none focus:border-blue-500"
            >
              <option value="rating">Sort by Rating</option>
              <option value="name-asc">Name: A → Z</option>
              <option value="name-desc">Name: Z → A</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-center text-blue-600 font-medium mb-6">
          Showing {filteredTuitions.length} of {tuitions.length} institutes
        </p>

        {/* Compact Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {filteredTuitions.map((tuition, index) => (
            <Link
              to={`/tuition/${tuition.id}`}
              key={tuition.id}
              className="group block bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <img
                src={getTuitionImage(tuition.id - 1)}
                alt={tuition.name}
                className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
              />

              <div className="p-4 text-center">
                <h3 className="font-bold text-sm text-gray-800 line-clamp-2 leading-tight">
                  {tuition.name}
                </h3>
                <p className="text-xs text-blue-600 mt-1">{tuition.location}</p>

                <div className="flex items-center justify-center gap-1 mt-3">
                  <span className="text-yellow-500 text-lg">Star</span>
                  <span className="font-bold text-gray-800 text-sm">{tuition.rating}</span>
                </div>

                {/* Small Blue Button */}
                <button className="mt-4 w-full bg-blue-600 text-white text-xs font-semibold py-2.5 rounded-xl hover:bg-blue-700 transition">
                  View Details
                </button>
              </div>
            </Link>
          ))}
        </div>

        {filteredTuitions.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">No tuition found</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default AllTuitions;