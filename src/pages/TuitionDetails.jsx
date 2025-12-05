import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
// --- CHANGE 1: Import useSelector to get the logged-in user ---
import { useSelector } from 'react-redux';
import { tuitions, tuitionImages } from '../data/tuitions'; // Using dummy data for now

const TuitionDetails = () => {
  const { id } = useParams();
  const tuition = tuitions.find((t) => t.id === parseInt(id));

  // --- CHANGE 2: Get user state from Redux ---
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [reviews, setReviews] = useState([
    { user: 'Rahul Sharma', text: 'Great coaching! Improved my grades.' },
    { user: 'Sneha Patil', text: 'Good faculty and study material.' },
  ]);
  const [newReview, setNewReview] = useState('');

  if (!tuition) {
    return <p className="text-center text-red-500">Tuition not found.</p>;
  }

  const nearbyTuitions = tuitions.filter(
    (t) => t.location === tuition.location && t.id !== tuition.id
  );

  const addReview = () => {
    if (newReview.trim() && isAuthenticated) {
      // --- CHANGE 3: Use the logged-in user's email for the review ---
      setReviews([...reviews, { user: user.email, text: newReview }]);
      setNewReview('');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Banner Section */}
      <div className="relative w-full h-64">
        <img
          src={tuitionImages[tuition.id % tuitionImages.length]}
          alt={tuition.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-white text-3xl font-bold">{tuition.name}</h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Tuition Info */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-2">{tuition.name}</h2>
          <p className="text-gray-500">📍 {tuition.location}</p>
          <p className="text-yellow-500 font-semibold text-lg">⭐ {tuition.rating}</p>

          {/* Reviews Section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Student Reviews</h3>
            <div className="bg-gray-100 p-4 rounded-lg mt-2 space-y-2">
              {reviews.map((review, index) => (
                <p key={index} className="text-gray-700">
                  <strong>{review.user}:</strong> {review.text}
                </p>
              ))}
            </div>

            {/* --- CHANGE 4: Only show review form if user is authenticated --- */}
            {isAuthenticated ? (
              <div className="mt-4">
                <textarea
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  className="w-full border p-2 mt-2 rounded-lg"
                  placeholder="Write a review..."
                ></textarea>
                <button
                  onClick={addReview}
                  className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-lg hover:bg-blue-700"
                >
                  Submit Review
                </button>
              </div>
            ) : (
              <p className="mt-4 text-gray-600">
                <Link to="/login" className="text-blue-500 hover:underline">Log in</Link> to write a review.
              </p>
            )}
          </div>
        </div>

        {/* Right: Sidebar */}
        <div className="col-span-1">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Nearby Tuitions</h3>
            {nearbyTuitions.length > 0 ? (
              nearbyTuitions.map((nearby) => (
                <Link
                  key={nearby.id}
                  to={`/tuition/${nearby.id}`}
                  className="block bg-gray-200 p-3 rounded-lg shadow-md hover:bg-gray-300 transition mb-2"
                >
                  <h4 className="font-semibold">{nearby.name}</h4>
                  <p className="text-gray-500">⭐ {nearby.rating}</p>
                </Link>
              ))
            ) : (
              <p className="text-gray-500">No nearby tuitions found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TuitionDetails;
