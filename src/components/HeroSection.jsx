import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { tuitions } from '../data/tuitions';

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setError('');

    if (value.length > 0) {
      const filteredSuggestions = tuitions
        .filter((tuition) => tuition.name.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 5);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSearchClick = () => {
    const formattedSearch = searchTerm.toLowerCase().trim();
    if (!formattedSearch) return;

    const foundTuition = tuitions.find(
      (tuition) => tuition.name.toLowerCase() === formattedSearch
    );

    if (foundTuition) {
      navigate(`/tuition/${foundTuition.id}`);
    } else {
      setError(`No tuition found for "${searchTerm}". Try a different name.`);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.name);
    setSuggestions([]);
    navigate(`/tuition/${suggestion.id}`);
  };

  return (
    <div
      className="relative w-full h-[80vh] bg-cover bg-center flex flex-col items-center justify-center text-white text-center px-4"
      style={{ backgroundImage: "url('/hero-bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 flex flex-col items-center w-full">
        <h1 className="text-3xl md:text-5xl font-bold">
          Your Resource for Finding the Best Tuitions
        </h1>
        <p className="mt-2 text-lg md:text-xl opacity-90">
          Discover, rate, and review tuitions in your area.
        </p>

        <div className="mt-8 w-full max-w-2xl flex flex-col items-center">
          <div className="relative w-full flex">
            <input
              type="text"
              placeholder="Search for tuition centers..."
              className="w-full p-4 rounded-l-lg text-black bg-white border-none focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyPress={(e) => e.key === 'Enter' && handleSearchClick()}
            />
            <button
              className="bg-blue-400 text-white px-6 py-4 rounded-r-lg hover:bg-blue-500 transition-colors"
              onClick={handleSearchClick}
            >
              Search
            </button>
          </div>

          {suggestions.length > 0 && (
            <ul className="absolute top-full mt-1 w-full max-w-2xl bg-white text-left font-bold text-black rounded-lg shadow-lg z-20">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.id}
                  className="p-3 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.name}
                </li>
              ))}
            </ul>
          )}
          {error && <p className="mt-2 text-red-400 bg-black/50 p-2 rounded">{error}</p>}
        </div>
        
        <Link to="/all-tuitions">
          <p className="mt-4 text-sm cursor-pointer hover:underline">
            or View All Tuitions
          </p>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
