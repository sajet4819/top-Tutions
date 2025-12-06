// src/pages/StudentDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { collection, query, orderBy, limit, getDocs, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { selectUser, selectUserProfile } from '../redux/authSlice';
import { selectEnrolledTuitions, selectLikedPosts } from '../redux/enrollmentsSlice';
import { 
  FaBookOpen, 
  FaClock, 
  FaSearch, 
  FaStar, 
  FaCalendarAlt, 
  FaTrophy, 
  FaUserGraduate,
  FaHeart,
  FaComment,
  FaChartLine,
  FaFire,
  FaBell,
  FaArrowRight
} from 'react-icons/fa';

const StudentDashboard = () => {
  const user = useSelector(selectUser);
  const userProfile = useSelector(selectUserProfile);
  const enrolledTuitions = useSelector(selectEnrolledTuitions);
  const likedPosts = useSelector(selectLikedPosts);
  const navigate = useNavigate();

  const [recentPosts, setRecentPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  // Fetch recent posts from enrolled tuitions
  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const postsRef = collection(db, 'posts');
        const q = query(postsRef, orderBy('createdAt', 'desc'), limit(5));
        const querySnapshot = await getDocs(q);
        
        const postsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setRecentPosts(postsData);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchRecentPosts();
  }, [enrolledTuitions]);

  // Mock enrolled classes (replace with real data from Firestore)
  const enrolledClasses = [
    { 
      id: 1, 
      tuitionId: 1,
      tuitionName: 'FIITJEE Kota',
      subject: 'Mathematics', 
      teacher: 'Prof. Sharma', 
      time: 'Mon, Wed, Fri 10:00 AM', 
      progress: 75,
      nextClass: 'Today, 10:00 AM'
    },
    { 
      id: 2, 
      tuitionId: 2,
      tuitionName: 'Allen Career Institute',
      subject: 'Physics', 
      teacher: 'Dr. Rajesh Kumar', 
      time: 'Tue, Thu 2:00 PM', 
      progress: 60,
      nextClass: 'Tomorrow, 2:00 PM'
    },
    { 
      id: 3, 
      tuitionId: 3,
      tuitionName: 'Resonance',
      subject: 'Chemistry', 
      teacher: 'Ms. Priya Singh', 
      time: 'Sat 9:00 AM', 
      progress: 90,
      nextClass: 'Saturday, 9:00 AM'
    },
  ];

  const displayName = userProfile?.name || user?.displayName || user?.email?.split('@')[0] || 'Student';

  const getTimeAgo = (timestamp) => {
    if (!timestamp) return 'Just now';
    const seconds = Math.floor((new Date() - timestamp) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-20 pb-16 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Welcome Header */}
        <div className="mb-12 animate-[slideDown_0.6s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">{displayName}!</span>
          </h1>
          <p className="text-xl text-gray-600">Here's what's happening with your learning journey</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 animate-[slideUp_0.6s_ease-out]">
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center border-t-4 border-blue-500 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <FaBookOpen className="text-4xl text-blue-600 mx-auto mb-3" />
            <h3 className="text-3xl font-bold text-gray-800">{enrolledClasses.length}</h3>
            <p className="text-gray-600 font-medium text-sm">Enrolled Classes</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center border-t-4 border-red-500 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <FaHeart className="text-4xl text-red-500 mx-auto mb-3" />
            <h3 className="text-3xl font-bold text-gray-800">{likedPosts.length}</h3>
            <p className="text-gray-600 font-medium text-sm">Liked Posts</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center border-t-4 border-green-500 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <FaTrophy className="text-4xl text-green-600 mx-auto mb-3" />
            <h3 className="text-3xl font-bold text-gray-800">A+</h3>
            <p className="text-gray-600 font-medium text-sm">Average Grade</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center border-t-4 border-orange-500 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <FaFire className="text-4xl text-orange-600 mx-auto mb-3" />
            <h3 className="text-3xl font-bold text-gray-800">12</h3>
            <p className="text-gray-600 font-medium text-sm">Day Streak</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* My Classes Section */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">My Classes</h2>
                <button
                  onClick={() => navigate('/all-tuitions')}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition shadow-lg flex items-center gap-2"
                >
                  <FaSearch /> Find New
                </button>
              </div>

              {enrolledClasses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {enrolledClasses.map((cls) => (
                    <div key={cls.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">
                      <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative flex items-center justify-center">
                        <FaBookOpen className="text-white text-5xl opacity-20" />
                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                          <span className="text-white font-bold text-sm">{cls.progress}%</span>
                        </div>
                      </div>
                      <div className="p-5">
                        <Link 
                          to={`/tuition/${cls.tuitionId}`}
                          className="text-lg font-bold text-gray-800 hover:text-blue-600 transition line-clamp-1"
                        >
                          {cls.tuitionName}
                        </Link>
                        <h3 className="text-xl font-bold text-blue-600 mb-3">{cls.subject}</h3>
                        
                        <div className="space-y-2 mb-4 text-sm">
                          <p className="text-gray-600 flex items-center gap-2">
                            <FaUserGraduate className="text-blue-600" />
                            {cls.teacher}
                          </p>
                          <p className="text-gray-600 flex items-center gap-2">
                            <FaCalendarAlt className="text-purple-600" />
                            {cls.time}
                          </p>
                          <p className="text-gray-600 flex items-center gap-2">
                            <FaClock className="text-green-600" />
                            Next: {cls.nextClass}
                          </p>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex justify-between text-xs text-gray-600 mb-2">
                            <span>Progress</span>
                            <span className="font-bold">{cls.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000"
                              style={{ width: `${cls.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition shadow-md">
                          Continue Learning
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-lg p-12 text-center border-2 border-dashed border-gray-300">
                  <FaBookOpen className="text-6xl text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">No Classes Yet</h3>
                  <p className="text-gray-600 mb-6">Start your learning journey by enrolling in a class</p>
                  <button
                    onClick={() => navigate('/all-tuitions')}
                    className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow-lg inline-flex items-center gap-2"
                  >
                    <FaSearch />
                    Browse Tuitions
                  </button>
                </div>
              )}
            </div>

            {/* Recent Updates from Tuitions */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Recent Updates</h2>
                <Link
                  to="/feed"
                  className="text-blue-600 font-semibold hover:text-blue-700 transition flex items-center gap-2"
                >
                  View All <FaArrowRight />
                </Link>
              </div>

              {loadingPosts ? (
                <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto"></div>
                  <p className="text-gray-600 mt-4">Loading updates...</p>
                </div>
              ) : recentPosts.length > 0 ? (
                <div className="space-y-4">
                  {recentPosts.slice(0, 3).map((post) => (
                    <div key={post.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition border border-gray-100">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                          {post.tuitionName?.charAt(0) || 'T'}
                        </div>
                        <div className="flex-1">
                          <Link to={`/tuition/${post.tuitionId}`} className="font-bold text-gray-800 hover:text-blue-600 transition">
                            {post.tuitionName}
                          </Link>
                          <p className="text-sm text-gray-500">{getTimeAgo(post.createdAt)}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 line-clamp-2 mb-4">{post.content}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <FaHeart className="text-red-500" />
                          {post.likes || 0}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaComment className="text-blue-500" />
                          {post.comments || 0}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                  <FaBell className="text-6xl text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">No updates yet. Enroll in classes to see their posts!</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            
            {/* Upcoming Classes Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border-t-4 border-blue-500">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaCalendarAlt className="text-blue-600" />
                Today's Schedule
              </h3>
              <div className="space-y-3">
                {enrolledClasses.filter(c => c.nextClass.includes('Today')).length > 0 ? (
                  enrolledClasses
                    .filter(c => c.nextClass.includes('Today'))
                    .map((cls) => (
                      <div key={cls.id} className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-200">
                        <h4 className="font-bold text-gray-800 text-sm">{cls.subject}</h4>
                        <p className="text-xs text-gray-600 mt-1">{cls.teacher}</p>
                        <p className="text-xs text-blue-600 font-semibold mt-2">{cls.nextClass}</p>
                      </div>
                    ))
                ) : (
                  <p className="text-gray-500 text-center py-4 text-sm">No classes today</p>
                )}
              </div>
            </div>

            {/* Performance Card */}
            <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl shadow-xl p-6 text-white">
              <FaChartLine className="text-4xl mb-3" />
              <h3 className="text-2xl font-bold mb-2">Keep it up!</h3>
              <p className="text-green-100 mb-4">You're making great progress</p>
              <div className="bg-white/20 rounded-xl p-3 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">This Week</span>
                  <span className="font-bold">85%</span>
                </div>
                <div className="w-full bg-white/30 rounded-full h-2">
                  <div className="bg-white h-full rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/feed')}
                  className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 py-3 rounded-xl font-semibold transition text-left px-4 flex items-center gap-3"
                >
                  <FaBell />
                  View Feed
                </button>
                <button
                  onClick={() => navigate('/all-tuitions')}
                  className="w-full bg-purple-50 hover:bg-purple-100 text-purple-600 py-3 rounded-xl font-semibold transition text-left px-4 flex items-center gap-3"
                >
                  <FaSearch />
                  Find Classes
                </button>
                <button
                  onClick={() => navigate('/profile')}
                  className="w-full bg-green-50 hover:bg-green-100 text-green-600 py-3 rounded-xl font-semibold transition text-left px-4 flex items-center gap-3"
                >
                  <FaUserGraduate />
                  My Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 mt-16 text-sm">
          TopTuitions • Your Success, Our Priority
        </p>
      </div>
    </div>
  );
};

export default StudentDashboard;