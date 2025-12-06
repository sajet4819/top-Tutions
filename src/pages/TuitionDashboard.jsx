// src/pages/TuitionDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { selectUser, selectUserProfile } from '../redux/authSlice';
import { 
  FaUsers, 
  FaChalkboardTeacher, 
  FaCalendarAlt, 
  FaChartLine, 
  FaBell,
  FaBookOpen,
  FaUserCheck,
  FaClock,
  FaEdit,
  FaPlus,
  FaEye,
  FaHeart,
  FaComment,
  FaPaperPlane,
  FaFire,
  FaTrophy
} from 'react-icons/fa';

const TuitionDashboard = () => {
  const user = useSelector(selectUser);
  const userProfile = useSelector(selectUserProfile);
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [myPosts, setMyPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  // Fetch tuition owner's posts
  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const postsRef = collection(db, 'posts');
        const q = query(
          postsRef, 
          where('ownerId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        
        const postsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setMyPosts(postsData);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoadingPosts(false);
      }
    };

    if (user) {
      fetchMyPosts();
    }
  }, [user]);

  // Mock data - replace with real data from Firestore
  const dashboardStats = {
    totalStudents: 245,
    totalPosts: myPosts.length,
    totalEngagement: myPosts.reduce((sum, post) => sum + (post.likes || 0) + (post.comments || 0), 0),
    enrollmentRate: 94
  };

  const recentEnrollments = [
    { id: 1, studentName: 'Rahul Kumar', course: 'JEE Advanced', time: '2 hours ago' },
    { id: 2, studentName: 'Priya Sharma', course: 'NEET Preparation', time: '5 hours ago' },
    { id: 3, studentName: 'Arjun Patel', course: 'Foundation Course', time: '1 day ago' },
  ];

  const upcomingClasses = [
    { 
      id: 1, 
      subject: 'Physics - Mechanics', 
      time: 'Today, 2:00 PM', 
      students: 35,
      status: 'starting-soon'
    },
    { 
      id: 2, 
      subject: 'Chemistry Organic', 
      time: 'Today, 5:00 PM', 
      students: 28,
      status: 'scheduled'
    },
    { 
      id: 3, 
      subject: 'Mathematics Advanced', 
      time: 'Tomorrow, 10:00 AM', 
      students: 42,
      status: 'scheduled'
    },
  ];

  const displayName = userProfile?.tuitionName || userProfile?.name || user?.displayName || 'Tuition Owner';

  const getTimeAgo = (timestamp) => {
    if (!timestamp) return 'Just now';
    const seconds = Math.floor((new Date() - timestamp) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 pt-20 pb-16 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Welcome Header */}
        <div className="mb-12 animate-[slideDown_0.6s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              {displayName}
            </span> Dashboard
          </h1>
          <p className="text-xl text-gray-600">Manage your tuition center and connect with students</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 animate-[slideUp_0.6s_ease-out]">
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center border-t-4 border-blue-500 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <FaUsers className="text-4xl text-blue-600 mx-auto mb-3" />
            <h3 className="text-3xl font-bold text-gray-800">{dashboardStats.totalStudents}</h3>
            <p className="text-gray-600 font-medium text-sm">Total Students</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center border-t-4 border-purple-500 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <FaPaperPlane className="text-4xl text-purple-600 mx-auto mb-3" />
            <h3 className="text-3xl font-bold text-gray-800">{dashboardStats.totalPosts}</h3>
            <p className="text-gray-600 font-medium text-sm">Total Posts</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center border-t-4 border-pink-500 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <FaFire className="text-4xl text-pink-600 mx-auto mb-3" />
            <h3 className="text-3xl font-bold text-gray-800">{dashboardStats.totalEngagement}</h3>
            <p className="text-gray-600 font-medium text-sm">Engagement</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center border-t-4 border-green-500 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <FaTrophy className="text-4xl text-green-600 mx-auto mb-3" />
            <h3 className="text-3xl font-bold text-gray-800">{dashboardStats.enrollmentRate}%</h3>
            <p className="text-gray-600 font-medium text-sm">Success Rate</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-8 overflow-x-auto bg-white rounded-2xl p-2 shadow-lg">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 rounded-xl font-semibold transition whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-6 py-3 rounded-xl font-semibold transition whitespace-nowrap ${
              activeTab === 'posts'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            My Posts ({myPosts.length})
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className={`px-6 py-3 rounded-xl font-semibold transition whitespace-nowrap ${
              activeTab === 'students'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Students
          </button>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content - Left Column (2/3 width) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <>
                {/* Quick Actions */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl shadow-2xl p-8 text-white">
                  <h2 className="text-3xl font-bold mb-6">Quick Actions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={() => navigate('/create-post')}
                      className="bg-white/20 backdrop-blur-md hover:bg-white/30 border-2 border-white/30 p-6 rounded-2xl font-semibold transition text-left flex items-center gap-4"
                    >
                      <FaPlus className="text-3xl" />
                      <div>
                        <div className="text-lg">Create New Post</div>
                        <div className="text-sm text-indigo-100">Share updates</div>
                      </div>
                    </button>
                    <button
                      onClick={() => navigate('/feed')}
                      className="bg-white/20 backdrop-blur-md hover:bg-white/30 border-2 border-white/30 p-6 rounded-2xl font-semibold transition text-left flex items-center gap-4"
                    >
                      <FaBell className="text-3xl" />
                      <div>
                        <div className="text-lg">View Feed</div>
                        <div className="text-sm text-indigo-100">See all posts</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Upcoming Classes */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 border border-indigo-100">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                      <FaClock className="text-indigo-600" /> Today's Classes
                    </h2>
                  </div>
                  
                  <div className="space-y-4">
                    {upcomingClasses.map((schedule) => (
                      <div 
                        key={schedule.id}
                        className={`p-6 rounded-2xl border-l-4 transition hover:shadow-lg ${
                          schedule.status === 'starting-soon'
                            ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-500'
                            : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-300'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-800">{schedule.subject}</h3>
                            <div className="flex flex-col gap-1 mt-2 text-sm">
                              <p className="text-gray-600 flex items-center gap-2">
                                <FaClock /> {schedule.time}
                              </p>
                              <p className="text-gray-600 flex items-center gap-2">
                                <FaUsers /> {schedule.students} students enrolled
                              </p>
                            </div>
                          </div>
                          {schedule.status === 'starting-soon' && (
                            <span className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full animate-pulse">
                              Starting Soon
                            </span>
                          )}
                        </div>
                        <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition shadow-md">
                          Start Class
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Posts Tab */}
            {activeTab === 'posts' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-bold text-gray-800">My Posts</h2>
                  <button
                    onClick={() => navigate('/create-post')}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition shadow-lg flex items-center gap-2"
                  >
                    <FaPlus /> New Post
                  </button>
                </div>

                {loadingPosts ? (
                  <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-indigo-600 mx-auto"></div>
                    <p className="text-gray-600 mt-4">Loading your posts...</p>
                  </div>
                ) : myPosts.length > 0 ? (
                  <div className="space-y-4">
                    {myPosts.map((post) => (
                      <div key={post.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition border border-gray-100">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-bold text-gray-800 text-lg">{post.tuitionName}</h3>
                            <p className="text-sm text-gray-500">{getTimeAgo(post.createdAt)}</p>
                          </div>
                          <button className="text-gray-400 hover:text-gray-600">
                            <FaEdit />
                          </button>
                        </div>
                        <p className="text-gray-700 mb-4 line-clamp-3">{post.content}</p>
                        <div className="flex items-center gap-6 text-sm border-t pt-4">
                          <span className="flex items-center gap-2 text-red-500">
                            <FaHeart />
                            {post.likes || 0} likes
                          </span>
                          <span className="flex items-center gap-2 text-blue-500">
                            <FaComment />
                            {post.comments || 0} comments
                          </span>
                          <span className="flex items-center gap-2 text-green-500">
                            <FaUserCheck />
                            {post.enrollments || 0} enrollments
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                    <FaPaperPlane className="text-6xl text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">No posts yet</h3>
                    <p className="text-gray-600 mb-6">Start sharing updates with your students!</p>
                    <button
                      onClick={() => navigate('/create-post')}
                      className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition shadow-lg inline-flex items-center gap-2"
                    >
                      <FaPlus />
                      Create Your First Post
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Students Tab */}
            {activeTab === 'students' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-800">Recent Enrollments</h2>
                <div className="space-y-4">
                  {recentEnrollments.map((enrollment) => (
                    <div key={enrollment.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition border border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                            {enrollment.studentName.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-800">{enrollment.studentName}</h3>
                            <p className="text-sm text-gray-600">{enrollment.course}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">{enrollment.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            
            {/* Performance Card */}
            <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl shadow-xl p-6 text-white">
              <FaChartLine className="text-4xl mb-3" />
              <h3 className="text-2xl font-bold mb-2">Great Work!</h3>
              <p className="text-green-100 mb-4">Your engagement is trending up</p>
              <div className="bg-white/20 rounded-xl p-3 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">This Month</span>
                  <span className="font-bold">+24%</span>
                </div>
                <div className="w-full bg-white/30 rounded-full h-2">
                  <div className="bg-white h-full rounded-full" style={{ width: '76%' }}></div>
                </div>
              </div>
            </div>

            {/* Profile Completion */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-indigo-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Profile Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Profile Info</span>
                  <span className="text-green-600 font-bold">✓</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">First Post</span>
                  <span className={myPosts.length > 0 ? "text-green-600 font-bold" : "text-gray-400"}>
                    {myPosts.length > 0 ? '✓' : '○'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Contact Info</span>
                  <span className="text-green-600 font-bold">✓</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Completion</span>
                  <span className="font-bold text-indigo-600">80%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-full rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Links</h3>
              <div className="space-y-3">
                <Link
                  to="/tuition-profile"
                  className="block bg-indigo-50 hover:bg-indigo-100 text-indigo-600 py-3 rounded-xl font-semibold transition text-center"
                >
                  Edit Profile
                </Link>
                <Link
                  to="/feed"
                  className="block bg-purple-50 hover:bg-purple-100 text-purple-600 py-3 rounded-xl font-semibold transition text-center"
                >
                  View Feed
                </Link>
                <Link
                  to="/all-tuitions"
                  className="block bg-pink-50 hover:bg-pink-100 text-pink-600 py-3 rounded-xl font-semibold transition text-center"
                >
                  Browse Tuitions
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 mt-16 text-sm">
          TopTuitions Tuition Portal • Empowering Education
        </p>
      </div>
    </div>
  );
};

export default TuitionDashboard;