// src/pages/AllTuitions.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { tuitions, getTuitionImage } from '../data/tuitions';
import { FaStar, FaMapMarkerAlt, FaSearch, FaFilter, FaTimes } from 'react-icons/fa';

const AllTuitions = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('name') || '');
  const [locationFilter, setLocationFilter] = useState(searchParams.get('location') || 'All');
  const [sortBy, setSortBy] = useState('rating');
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  // Get unique locations
  const locations = ['All', ...new Set(tuitions.map(t => t.location))];

  // Set initial search/location from URL params
  useEffect(() => {
    const nameParam = searchParams.get('name');
    const locationParam = searchParams.get('location');
    
    if (nameParam) setSearch(nameParam);
    if (locationParam) setLocationFilter(locationParam);
  }, [searchParams]);

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

  // Clear all filters
  const clearFilters = () => {
    setSearch('');
    setLocationFilter('All');
    setSortBy('rating');
  };

  const hasActiveFilters = search || locationFilter !== 'All';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12 animate-[slideDown_0.6s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Explore Tuition Centers
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse through {tuitions.length}+ top-rated tuition centers across India
          </p>
        </div>

        {/* Search + Filters Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-8 border border-gray-100 animate-[slideUp_0.6s_ease-out]">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Search by tuition name (e.g., FIITJEE, Allen, Resonance...)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-14 pr-12 py-4 rounded-2xl border-2 border-gray-200 focus:outline-none focus:border-blue-500 text-gray-800 text-lg transition-all duration-300"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  <FaTimes />
                </button>
              )}
            </div>
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-gray-700 font-semibold">
              <FaFilter />
              <span>Filters:</span>
            </div>

            {/* Location Filter */}
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="px-5 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-medium focus:outline-none focus:border-blue-500 bg-white hover:border-gray-300 transition cursor-pointer"
            >
              {locations.map(loc => (
                <option key={loc} value={loc}>
                  {loc === 'All' ? '📍 All Locations' : `📍 ${loc}`}
                </option>
              ))}
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-5 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-medium focus:outline-none focus:border-blue-500 bg-white hover:border-gray-300 transition cursor-pointer"
            >
              <option value="rating">⭐ Highest Rated</option>
              <option value="name-asc">🔤 Name: A → Z</option>
              <option value="name-desc">🔤 Name: Z → A</option>
            </select>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="ml-auto px-5 py-3 rounded-xl bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition flex items-center gap-2"
              >
                <FaTimes />
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-8">
          <p className="text-lg font-semibold text-gray-700">
            Showing <span className="text-blue-600">{filteredTuitions.length}</span> of{' '}
            <span className="text-blue-600">{tuitions.length}</span> tuition centers
          </p>

          {/* View Mode Toggle */}
          <div className="flex gap-2 bg-white rounded-xl p-1 shadow-md">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              List
            </button>
          </div>
        </div>

        {/* Tuitions Grid/List */}
        {viewMode === 'grid' ? (
          // Grid View
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filteredTuitions.map((tuition) => (
              <Link
                to={`/tuition/${tuition.id}`}
                key={tuition.id}
                className="group block bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100"
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
                  <img
                    src={getTuitionImage(tuition.id)}
                    alt={tuition.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg shadow-lg flex items-center gap-1">
                    <FaStar className="text-yellow-500 text-xs" />
                    <span className="font-bold text-gray-800 text-sm">{tuition.rating}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 text-center">
                  <h3 className="font-bold text-sm text-gray-800 line-clamp-2 leading-tight mb-2 group-hover:text-blue-600 transition-colors">
                    {tuition.name}
                  </h3>
                  <p className="text-xs text-gray-600 flex items-center justify-center gap-1 mb-4">
                    <FaMapMarkerAlt className="text-blue-600" />
                    {tuition.location}
                  </p>

                  <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold py-2.5 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg">
                    View Details
                  </button>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          // List View
          <div className="space-y-4">
            {filteredTuitions.map((tuition) => (
              <Link
                to={`/tuition/${tuition.id}`}
                key={tuition.id}
                className="group flex bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                {/* Image */}
                <div className="relative w-48 h-32 flex-shrink-0 overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
                  <img
                    src={getTuitionImage(tuition.id)}
                    alt={tuition.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 p-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                      {tuition.name}
                    </h3>
                    <p className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                      <FaMapMarkerAlt className="text-blue-600" />
                      {tuition.location}
                    </p>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <FaStar />
                      <span className="font-bold text-gray-800">{tuition.rating}</span>
                      <span className="text-gray-500 text-sm ml-1">(4.5K reviews)</span>
                    </div>
                  </div>

                  <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg">
                    View Details →
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredTuitions.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl shadow-lg">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No tuition centers found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filters to find what you're looking for
            </p>
            <button
              onClick={clearFilters}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Clear All Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default AllTuitions;