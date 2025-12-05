import React from 'react';
import { Link } from 'react-router-dom';
import { tuitions, tuitionImages } from '../data/tuitions';

const FeaturedTuitions = () => {
  return (
    <section className="py-10 px-6 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center">Featured Tuitions</h2>

      <div className="relative w-full overflow-x-auto">
        <div className="flex space-x-6 w-max px-4 py-2">
          {tuitions.slice(0, 10).map((tuition, index) => ( // Slicing to show a limited number
            <Link
              key={tuition.id}
              to={`/tuition/${tuition.id}`}
              className="min-w-[250px] h-48 p-4 rounded-lg shadow-lg text-white flex flex-col justify-end relative overflow-hidden transform hover:scale-105 transition-transform"
              style={{
                backgroundImage: `url(${tuitionImages[index % tuitionImages.length]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
              <div className="relative z-10 p-3">
                <h3 className="text-xl font-semibold">{tuition.name}</h3>
                <p className="text-gray-200">📍 {tuition.location}</p>
                <p className="text-yellow-400 font-semibold">⭐ {tuition.rating}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTuitions;
