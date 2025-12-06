// src/components/RecentPosts.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaComment, FaUserCheck, FaArrowRight, FaClock } from 'react-icons/fa';

const RecentPosts = () => {
  // Mock data - will be replaced with real data from Firestore
  const recentPosts = [
    {
      id: 1,
      tuitionName: 'FIITJEE Kota',
      tuitionImage: 'https://via.placeholder.com/400x300?text=FIITJEE',
      content: '🎉 Congratulations to our students! 15 students selected in JEE Advanced 2024. Hard work pays off! Join our next batch starting next month.',
      timestamp: '2 hours ago',
      likes: 234,
      comments: 45,
      enrollments: 12
    },
    {
      id: 2,
      tuitionName: 'Allen Career Institute',
      tuitionImage: 'https://via.placeholder.com/400x300?text=Allen',
      content: 'New NEET batch starting from January 15th! Limited seats available. Expert faculty, comprehensive study material, and regular mock tests. Enroll now!',
      timestamp: '5 hours ago',
      likes: 189,
      comments: 32,
      enrollments: 8
    },
    {
      id: 3,
      tuitionName: 'Resonance Jaipur',
      tuitionImage: 'https://via.placeholder.com/400x300?text=Resonance',
      content: 'Special workshop on Problem Solving Techniques this weekend! Free for all enrolled students. Guest lecture by IIT Delhi Professor. Register now! 📚',
      timestamp: '1 day ago',
      likes: 156,
      comments: 28,
      enrollments: 15
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Latest Updates
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay connected with what's happening at top tuition centers
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {recentPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100 hover:-translate-y-2"
            >
              {/* Tuition Header */}
              <div className="p-5 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                    {post.tuitionName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {post.tuitionName}
                    </h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <FaClock className="text-[10px]" />
                      {post.timestamp}
                    </p>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-5">
                <p className="text-gray-700 line-clamp-4 mb-4 leading-relaxed">
                  {post.content}
                </p>

                {/* Engagement Stats */}
                <div className="flex items-center gap-4 text-sm text-gray-600 border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-1">
                    <FaHeart className="text-red-500" />
                    <span className="font-semibold">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaComment className="text-blue-500" />
                    <span className="font-semibold">{post.comments}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaUserCheck className="text-green-500" />
                    <span className="font-semibold">{post.enrollments}</span>
                  </div>
                </div>
              </div>

              {/* View Post Button */}
              <div className="px-5 pb-5">
                <Link
                  to={`/feed`}
                  className="w-full block text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
                >
                  View Full Post
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            to="/feed"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View All Updates
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentPosts;