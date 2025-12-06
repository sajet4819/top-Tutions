// src/pages/Feed.jsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { setPosts, setLoading } from '../redux/postsSlice';
import { selectAllPosts, selectPostsLoading } from '../redux/postsSlice';
import { selectIsAuthenticated, selectUserType } from '../redux/authSlice';
import { FaHeart, FaRegHeart, FaComment, FaUserCheck, FaClock, FaFilter, FaPlus } from 'react-icons/fa';

const Feed = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const loading = useSelector(selectPostsLoading);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userType = useSelector(selectUserType);
  
  const [filterBy, setFilterBy] = useState('all'); // all, enrolled, popular
  const [sortBy, setSortBy] = useState('recent'); // recent, popular

  // Fetch posts from Firestore
  useEffect(() => {
    const fetchPosts = async () => {
      dispatch(setLoading(true));
      try {
        const postsRef = collection(db, 'posts');
        const q = query(postsRef, orderBy('createdAt', 'desc'), limit(50));
        const querySnapshot = await getDocs(q);
        
        const postsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        dispatch(setPosts(postsData));
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [dispatch]);

  // Mock data for demo (remove when Firestore has data)
  const mockPosts = posts.length === 0 ? [
    {
      id: 1,
      tuitionName: 'FIITJEE Kota',
      tuitionId: 'fiitjee_kota',
      ownerPhoto: null,
      content: '🎉 Congratulations to our students! 15 students selected in JEE Advanced 2024. Hard work pays off! Join our next batch starting next month. Limited seats available. Contact us for details.',
      images: [],
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      likes: 234,
      comments: 45,
      enrollments: 12
    },
    {
      id: 2,
      tuitionName: 'Allen Career Institute',
      tuitionId: 'allen_jaipur',
      ownerPhoto: null,
      content: 'New NEET batch starting from January 15th! 📚 Expert faculty, comprehensive study material, regular mock tests, and doubt sessions. Early bird discount of 20% for registrations before Dec 31st. Limited seats!',
      images: [],
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
      likes: 189,
      comments: 32,
      enrollments: 8
    },
    {
      id: 3,
      tuitionName: 'Resonance Eduventures',
      tuitionId: 'resonance_kota',
      ownerPhoto: null,
      content: 'Special workshop on Problem Solving Techniques this weekend! 🚀 Free for all enrolled students. Guest lecture by IIT Delhi Professor Dr. Sharma. Topics: Advanced calculus, Integration techniques, and Time management. Register now!',
      images: [],
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      likes: 156,
      comments: 28,
      enrollments: 15
    }
  ] : posts;

  const getTimeAgo = (timestamp) => {
    if (!timestamp) return 'Just now';
    const seconds = Math.floor((new Date() - timestamp) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Feed</h1>
              <p className="text-gray-600">Latest updates from tuition centers</p>
            </div>
            {isAuthenticated && userType === 'tuition_owner' && (
              <Link
                to="/create-post"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg flex items-center gap-2"
              >
                <FaPlus />
                Create Post
              </Link>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-600" />
              <span className="font-semibold text-gray-700">Filter:</span>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setFilterBy('all')}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  filterBy === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Posts
              </button>
              {isAuthenticated && userType === 'student' && (
                <button
                  onClick={() => setFilterBy('enrolled')}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    filterBy === 'enrolled'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Enrolled
                </button>
              )}
              <button
                onClick={() => setFilterBy('popular')}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  filterBy === 'popular'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Popular
              </button>
            </div>

            <div className="ml-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg border-2 border-gray-200 font-semibold focus:outline-none focus:border-blue-500"
              >
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4 font-semibold">Loading posts...</p>
          </div>
        )}

        {/* Posts List */}
        {!loading && (
          <div className="space-y-6">
            {mockPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* Post Header */}
                <div className="p-5 border-b border-gray-100">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {/* Tuition Avatar */}
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        {post.tuitionName.charAt(0)}
                      </div>
                      <div>
                        <Link
                          to={`/tuition/${post.tuitionId}`}
                          className="font-bold text-gray-800 hover:text-blue-600 transition-colors text-lg"
                        >
                          {post.tuitionName}
                        </Link>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <FaClock className="text-xs" />
                          {getTimeAgo(post.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-6">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                    {post.content}
                  </p>

                  {/* Post Images (if any) */}
                  {post.images && post.images.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {post.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt="Post"
                          className="w-full h-48 object-cover rounded-xl"
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Post Actions */}
                <div className="px-6 pb-5">
                  <div className="flex items-center gap-6 text-gray-600 border-t border-gray-100 pt-4">
                    <button className="flex items-center gap-2 hover:text-red-500 transition-colors">
                      <FaRegHeart className="text-xl" />
                      <span className="font-semibold">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                      <FaComment className="text-xl" />
                      <span className="font-semibold">{post.comments}</span>
                    </button>
                    <div className="flex items-center gap-2 text-green-600">
                      <FaUserCheck className="text-xl" />
                      <span className="font-semibold">{post.enrollments} enrolled</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {isAuthenticated && userType === 'student' && (
                    <div className="mt-4 flex gap-3">
                      <button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300">
                        Enroll Now
                      </button>
                      <button className="px-6 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300">
                        Comment
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && mockPosts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
            <p className="text-2xl text-gray-600 mb-4">No posts yet</p>
            <p className="text-gray-500">Check back later for updates from tuition centers</p>
          </div>
        )}

        {/* CTA for non-authenticated users */}
        {!isAuthenticated && (
          <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white shadow-2xl">
            <h3 className="text-2xl font-bold mb-3">Want to engage with posts?</h3>
            <p className="text-blue-100 mb-6">Sign up to like, comment, and enroll in classes</p>
            <Link
              to="/login"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300"
            >
              Sign Up Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;