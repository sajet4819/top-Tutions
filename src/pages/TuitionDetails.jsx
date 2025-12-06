// src/pages/TuitionDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { tuitions, getTuitionImage } from '../data/tuitions';
import { selectIsAuthenticated, selectUser, selectUserType } from '../redux/authSlice';
import { 
  FaStar, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaGlobe, 
  FaClock,
  FaUsers,
  FaChalkboardTeacher,
  FaHeart,
  FaRegHeart,
  FaComment,
  FaUserCheck,
  FaArrowLeft,
  FaShare
} from 'react-icons/fa';

const TuitionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const tuition = tuitions.find((t) => t.id === parseInt(id));

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const userType = useSelector(selectUserType);

  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [reviews, setReviews] = useState([
    { user: 'Rahul Sharma', rating: 5, text: 'Excellent coaching! The faculty is very supportive and knowledgeable.', date: '2 weeks ago' },
    { user: 'Priya Patel', rating: 4, text: 'Good study material and regular tests. Helped me improve a lot.', date: '1 month ago' },
    { user: 'Arjun Kumar', rating: 5, text: 'Best tuition in the area. Highly recommended for JEE preparation!', date: '1 month ago' },
  ]);
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [activeTab, setActiveTab] = useState('about'); // about, posts, reviews

  useEffect(() => {
    // Fetch posts for this tuition
    const fetchPosts = async () => {
      try {
        const postsRef = collection(db, 'posts');
        const q = query(
          postsRef, 
          where('tuitionId', '==', id),
          orderBy('createdAt', 'desc'),
          limit(10)
        );
        const querySnapshot = await getDocs(q);
        
        const postsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setPosts(postsData);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchPosts();
  }, [id]);

  if (!tuition) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Tuition Not Found</h2>
          <p className="text-gray-600 mb-6">The tuition center you're looking for doesn't exist.</p>
          <Link
            to="/all-tuitions"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Browse All Tuitions
          </Link>
        </div>
      </div>
    );
  }

  const nearbyTuitions = tuitions
    .filter((t) => t.location === tuition.location && t.id !== tuition.id)
    .slice(0, 5);

  const addReview = () => {
    if (newReview.trim() && isAuthenticated) {
      setReviews([
        { 
          user: user.displayName || user.email, 
          rating: newRating,
          text: newReview,
          date: 'Just now'
        },
        ...reviews
      ]);
      setNewReview('');
      setNewRating(5);
    }
  };

  const getTimeAgo = (timestamp) => {
    if (!timestamp) return 'Just now';
    const seconds = Math.floor((new Date() - timestamp) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-20 pb-16">
      
      {/* Hero Banner */}
      <div className="relative w-full h-80 overflow-hidden">
        <img
          src={getTuitionImage(tuition.id)}
          alt={tuition.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-xl font-semibold hover:bg-white/20 transition flex items-center gap-2 border border-white/30"
        >
          <FaArrowLeft />
          Back
        </button>

        {/* Share Button */}
        <button className="absolute top-6 right-6 bg-white/10 backdrop-blur-md text-white p-3 rounded-xl hover:bg-white/20 transition border border-white/30">
          <FaShare />
        </button>

        {/* Tuition Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">{tuition.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-lg">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
                <FaMapMarkerAlt className="text-yellow-300" />
                <span>{tuition.location}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
                <FaStar className="text-yellow-300" />
                <span className="font-bold">{averageRating}</span>
                <span className="text-blue-200">({reviews.length} reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-lg p-2 flex gap-2">
              <button
                onClick={() => setActiveTab('about')}
                className={`flex-1 py-3 rounded-xl font-semibold transition ${
                  activeTab === 'about'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                About
              </button>
              <button
                onClick={() => setActiveTab('posts')}
                className={`flex-1 py-3 rounded-xl font-semibold transition ${
                  activeTab === 'posts'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Posts ({posts.length})
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`flex-1 py-3 rounded-xl font-semibold transition ${
                  activeTab === 'reviews'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Reviews ({reviews.length})
              </button>
            </div>

            {/* About Tab */}
            {activeTab === 'about' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">About {tuition.name}</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {tuition.name} is one of the leading coaching institutes in {tuition.location}. 
                      We provide comprehensive preparation for JEE, NEET, and other competitive exams 
                      with experienced faculty and proven teaching methodologies. Our state-of-the-art 
                      facilities and personalized attention help students achieve their academic goals.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FaChalkboardTeacher className="text-blue-600 text-xl" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Expert Faculty</h4>
                        <p className="text-gray-600 text-sm">Experienced teachers from IIT/NIT</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FaUsers className="text-green-600 text-xl" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Small Batches</h4>
                        <p className="text-gray-600 text-sm">Max 30 students per batch</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FaClock className="text-purple-600 text-xl" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Flexible Timings</h4>
                        <p className="text-gray-600 text-sm">Morning & evening batches</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FaStar className="text-orange-600 text-xl" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Proven Results</h4>
                        <p className="text-gray-600 text-sm">95% success rate</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-gray-700">
                        <FaPhone className="text-blue-600" />
                        <span>+91 9876543210</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700">
                        <FaEnvelope className="text-blue-600" />
                        <span>contact@{tuition.name.toLowerCase().replace(/\s+/g, '')}.com</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700">
                        <FaGlobe className="text-blue-600" />
                        <a href="#" className="text-blue-600 hover:underline">
                          www.{tuition.name.toLowerCase().replace(/\s+/g, '')}.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Posts Tab */}
            {activeTab === 'posts' && (
              <div className="space-y-6">
                {loadingPosts ? (
                  <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto"></div>
                    <p className="text-gray-600 mt-4">Loading posts...</p>
                  </div>
                ) : posts.length > 0 ? (
                  posts.map((post) => (
                    <div key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                              {tuition.name.charAt(0)}
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-800">{tuition.name}</h3>
                              <p className="text-sm text-gray-500">{getTimeAgo(post.createdAt)}</p>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed mb-4">{post.content}</p>
                        
                        <div className="flex items-center gap-6 text-gray-600 border-t pt-4">
                          <button className="flex items-center gap-2 hover:text-red-500 transition">
                            <FaRegHeart />
                            <span>{post.likes || 0}</span>
                          </button>
                          <button className="flex items-center gap-2 hover:text-blue-500 transition">
                            <FaComment />
                            <span>{post.comments || 0}</span>
                          </button>
                          <div className="flex items-center gap-2 text-green-600">
                            <FaUserCheck />
                            <span>{post.enrollments || 0} enrolled</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                    <p className="text-gray-600 text-lg">No posts yet from this tuition center</p>
                  </div>
                )}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {/* Add Review Form */}
                {isAuthenticated && userType === 'student' ? (
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Write a Review</h3>
                    
                    {/* Rating Selector */}
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Your Rating</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setNewRating(star)}
                            className="text-3xl transition"
                          >
                            <FaStar className={star <= newRating ? 'text-yellow-500' : 'text-gray-300'} />
                          </button>
                        ))}
                      </div>
                    </div>

                    <textarea
                      value={newReview}
                      onChange={(e) => setNewReview(e.target.value)}
                      className="w-full border-2 border-gray-200 p-4 rounded-xl focus:outline-none focus:border-blue-500 resize-none"
                      rows="4"
                      placeholder="Share your experience with this tuition center..."
                    ></textarea>
                    <button
                      onClick={addReview}
                      disabled={!newReview.trim()}
                      className="mt-4 bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Submit Review
                    </button>
                  </div>
                ) : !isAuthenticated ? (
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 text-center">
                    <p className="text-gray-700 mb-4">
                      Want to share your experience?
                    </p>
                    <Link
                      to="/login"
                      className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                    >
                      Login to Write a Review
                    </Link>
                  </div>
                ) : null}

                {/* Reviews List */}
                <div className="space-y-4">
                  {reviews.map((review, index) => (
                    <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-bold text-gray-800">{review.user}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <FaStar
                                  key={i}
                                  className={i < review.rating ? 'text-yellow-500' : 'text-gray-300'}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{review.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            
            {/* Enroll Card */}
            {isAuthenticated && userType === 'student' && (
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-2xl p-6 text-white">
                <h3 className="text-2xl font-bold mb-4">Ready to Join?</h3>
                <p className="text-blue-100 mb-6">
                  Start your journey with {tuition.name} today!
                </p>
                <button className="w-full bg-white text-blue-600 py-3 rounded-xl font-bold hover:bg-gray-100 transition shadow-lg">
                  Enroll Now
                </button>
              </div>
            )}

            {/* Nearby Tuitions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Nearby Tuitions</h3>
              {nearbyTuitions.length > 0 ? (
                <div className="space-y-3">
                  {nearbyTuitions.map((nearby) => (
                    <Link
                      key={nearby.id}
                      to={`/tuition/${nearby.id}`}
                      className="block bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-xl hover:shadow-lg transition border border-gray-100"
                    >
                      <h4 className="font-bold text-gray-800">{nearby.name}</h4>
                      <div className="flex items-center gap-1 mt-2 text-sm">
                        <FaStar className="text-yellow-500" />
                        <span className="font-semibold text-gray-700">{nearby.rating}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No nearby tuitions found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TuitionDetails;