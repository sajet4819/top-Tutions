// src/pages/UserProfile.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { logout } from '../redux/authSlice';
import { 
  selectUser, 
  selectUserType, 
  selectUserProfile,
  selectIsAuthenticated 
} from '../redux/authSlice';
import { 
  selectEnrolledTuitions, 
  selectLikedPosts, 
  selectMyComments 
} from '../redux/enrollmentsSlice';
import { 
  FaUser, 
  FaEnvelope, 
  FaUserGraduate, 
  FaChalkboardTeacher, 
  FaEdit,
  FaSignOutAlt,
  FaHeart,
  FaComment,
  FaBookOpen,
  FaMapMarkerAlt,
  FaPhone,
  FaGlobe,
  FaCamera,
  FaArrowLeft
} from 'react-icons/fa';

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const user = useSelector(selectUser);
  const userType = useSelector(selectUserType);
  const userProfile = useSelector(selectUserProfile);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  
  const enrolledTuitions = useSelector(selectEnrolledTuitions);
  const likedPosts = useSelector(selectLikedPosts);
  const myComments = useSelector(selectMyComments);

  const [activeTab, setActiveTab] = useState('overview'); // overview, activity, settings
  const [isEditing, setIsEditing] = useState(false);

  // Redirect if not authenticated
  if (!isAuthenticated || !user) {
    navigate('/login');
    return null;
  }

  const isTuitionOwner = userType === 'tuition_owner';

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      localStorage.removeItem('userType');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const displayName = userProfile?.name || user.displayName || user.email?.split('@')[0] || 'User';
  const profilePhoto = userProfile?.photoURL || user.photoURL;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-20 pb-16 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-gray-600 hover:text-gray-800 font-semibold flex items-center gap-2 transition"
        >
          <FaArrowLeft />
          Back
        </button>

        {/* Main Profile Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          
          {/* Header with Gradient Background */}
          <div className="relative h-48 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}></div>
            </div>
          </div>

          <div className="relative px-8 pb-12">
            {/* Profile Picture */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-20">
              <div className="relative">
                {profilePhoto ? (
                  <img
                    src={profilePhoto}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-8 border-white shadow-2xl object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-5xl font-bold shadow-2xl border-8 border-white">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                )}
                <button className="absolute bottom-2 right-2 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition">
                  <FaCamera />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6 md:mt-0">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg transition flex items-center gap-2"
                >
                  <FaEdit />
                  Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="px-6 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-semibold transition flex items-center gap-2 border-2 border-red-200"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </div>
            </div>

            {/* User Info */}
            <div className="mt-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">{displayName}</h1>
              <p className="text-lg text-gray-600 flex items-center gap-2 mb-4">
                <FaEnvelope className="text-blue-600" />
                {user.email}
              </p>

              {/* Role Badge */}
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-blue-200">
                {isTuitionOwner ? (
                  <>
                    <FaChalkboardTeacher className="text-xl text-purple-600" />
                    <span className="font-bold text-gray-800">Tuition Owner</span>
                  </>
                ) : (
                  <>
                    <FaUserGraduate className="text-xl text-blue-600" />
                    <span className="font-bold text-gray-800">Student</span>
                  </>
                )}
              </div>

              {/* Bio */}
              {userProfile?.bio && (
                <p className="mt-6 text-gray-700 leading-relaxed max-w-3xl">
                  {userProfile.bio}
                </p>
              )}

              {/* Additional Info */}
              <div className="flex flex-wrap gap-6 mt-6 text-gray-600">
                {userProfile?.location && (
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-blue-600" />
                    <span>{userProfile.location}</span>
                  </div>
                )}
                {isTuitionOwner && userProfile?.tuitionName && (
                  <div className="flex items-center gap-2">
                    <FaChalkboardTeacher className="text-purple-600" />
                    <span>{userProfile.tuitionName}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Stats Cards */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              {!isTuitionOwner && (
                <>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-center border border-blue-200">
                    <FaBookOpen className="text-3xl text-blue-600 mx-auto mb-2" />
                    <div className="text-3xl font-bold text-gray-800">{enrolledTuitions.length}</div>
                    <p className="text-sm text-gray-600 mt-1">Enrolled</p>
                  </div>
                  <div className="bg-gradient-to-br from-red-50 to-pink-100 rounded-2xl p-6 text-center border border-red-200">
                    <FaHeart className="text-3xl text-red-500 mx-auto mb-2" />
                    <div className="text-3xl font-bold text-gray-800">{likedPosts.length}</div>
                    <p className="text-sm text-gray-600 mt-1">Liked Posts</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 text-center border border-purple-200">
                    <FaComment className="text-3xl text-purple-600 mx-auto mb-2" />
                    <div className="text-3xl font-bold text-gray-800">{myComments.length}</div>
                    <p className="text-sm text-gray-600 mt-1">Comments</p>
                  </div>
                </>
              )}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 text-center border border-green-200">
                <div className="text-3xl font-bold text-green-600">
                  {userProfile ? '100%' : '60%'}
                </div>
                <p className="text-sm text-gray-600 mt-1">Complete</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-12 border-b border-gray-200">
              <div className="flex gap-6">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`pb-4 font-semibold transition border-b-2 ${
                    activeTab === 'overview'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Overview
                </button>
                {!isTuitionOwner && (
                  <button
                    onClick={() => setActiveTab('activity')}
                    className={`pb-4 font-semibold transition border-b-2 ${
                      activeTab === 'activity'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Activity
                  </button>
                )}
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`pb-4 font-semibold transition border-b-2 ${
                    activeTab === 'settings'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Settings
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="mt-8">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      {isTuitionOwner ? 'Tuition Center Dashboard' : 'Student Dashboard'}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {isTuitionOwner 
                        ? 'Manage your tuition center, create posts, and connect with students.'
                        : 'Track your enrolled classes, view updates, and manage your learning journey.'}
                    </p>
                    <button
                      onClick={() => navigate(isTuitionOwner ? '/tuition-dashboard' : '/student-dashboard')}
                      className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow-lg"
                    >
                      Go to Dashboard →
                    </button>
                  </div>

                  {isTuitionOwner && (
                    <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button
                          onClick={() => navigate('/create-post')}
                          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition"
                        >
                          Create New Post
                        </button>
                        <button
                          onClick={() => navigate('/feed')}
                          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition"
                        >
                          View Feed
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Activity Tab (Students Only) */}
              {activeTab === 'activity' && !isTuitionOwner && (
                <div className="space-y-6">
                  {/* Enrolled Tuitions */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Enrolled Tuition Centers</h3>
                    {enrolledTuitions.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {enrolledTuitions.map((enrollment) => (
                          <div key={enrollment.tuitionId} className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                            <h4 className="font-bold text-gray-800">Tuition #{enrollment.tuitionId}</h4>
                            <p className="text-sm text-gray-600 mt-1">Enrolled on {enrollment.enrolledAt}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-8 text-center">
                        <p className="text-gray-600">No enrolled tuitions yet</p>
                        <button
                          onClick={() => navigate('/all-tuitions')}
                          className="mt-4 text-blue-600 font-semibold hover:underline"
                        >
                          Browse Tuitions →
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Liked Posts */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Liked Posts</h3>
                    {likedPosts.length > 0 ? (
                      <p className="text-gray-600">You've liked {likedPosts.length} posts</p>
                    ) : (
                      <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-8 text-center">
                        <p className="text-gray-600">No liked posts yet</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Account Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                        <input
                          type="text"
                          value={displayName}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={user.email}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50"
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
                        <textarea
                          value={userProfile?.bio || ''}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 resize-none"
                          rows="4"
                          disabled={!isEditing}
                          placeholder="Tell us about yourself..."
                        />
                      </div>
                      {isEditing && (
                        <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
                          Save Changes
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8">
                    <h3 className="text-xl font-bold text-red-600 mb-4">Danger Zone</h3>
                    <p className="text-gray-600 mb-4">Once you delete your account, there is no going back.</p>
                    <button className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition">
                      Delete Account
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;