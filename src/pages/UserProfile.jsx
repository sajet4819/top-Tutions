// src/pages/UserProfile.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaUserGraduate, FaChalkboardTeacher, FaEdit } from 'react-icons/fa';

const UserProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // If no user (shouldn't happen), redirect to login
  if (!user) {
    navigate('/login');
    return null;
  }

  const isClassOwner = user.role === 'class';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 transition"
        >
          ← Back
        </button>

        {/* Main Profile Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header with Gradient */}
          <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>

          <div className="relative px-10 pb-12 pt-6">
            {/* Profile Picture */}
            <div className="absolute -top-20 left-10">
              {user.photo ? (
                <img
                  src={user.photo}
                  alt="Profile"
                  className="w-40 h-40 rounded-full border-8 border-white shadow-2xl object-cover"
                />
              ) : (
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-6xl font-bold shadow-2xl border-8 border-white">
                  {user.email?.[0].toUpperCase() || 'U'}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="mt-24 text-center md:text-left md:flex md:justify-between md:items-start">
              <div className="md:ml-56">
                <h1 className="text-4xl font-bold text-gray-800">{user.name || user.email.split('@')[0]}</h1>
                <p className="text-xl text-gray-600 mt-2 flex items-center justify-center md:justify-start gap-3">
                  <FaEnvelope className="text-blue-500" />
                  {user.email}
                </p>

                {/* Role Badge */}
                <div className="mt-6 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-blue-200">
                  {isClassOwner ? (
                    <FaChalkboardTeacher className="text-2xl text-purple-600" />
                  ) : (
                    <FaUserGraduate className="text-2xl text-blue-600" />
                  )}
                  <span className="font-bold text-lg text-gray-800">
                    {isClassOwner ? 'Class Owner' : 'Student'}
                  </span>
                </div>
              </div>

              {/* Edit Button */}
              <button className="mt-8 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold shadow-lg transition flex items-center gap-3 text-lg">
                <FaEdit />
                Edit Profile
              </button>
            </div>

            {/* Stats / Info Cards */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center border border-blue-200">
                <FaUser className="text-4xl text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800">Account Type</h3>
                <p className="text-lg text-gray-600 mt-2 capitalize">{user.role || 'student'}</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 text-center border border-purple-200">
                <FaUserGraduate className="text-4xl text-purple-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800">Dashboard</h3>
                <button
                  onClick={() => navigate(isClassOwner ? '/classdashboard' : '/studentdashboard')}
                  className="mt-2 text-purple-600 font-bold underline hover:text-purple-800"
                >
                  Go to {isClassOwner ? 'Manage Classes' : 'My Dashboard'} →
                </button>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 text-center border border-green-200">
                <div className="text-5xl font-bold text-green-600">100%</div>
                <p className="text-xl font-semibold text-gray-800 mt-3">Profile Complete</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-500 mt-12 text-sm">
          Logged in via {user.photo ? 'Google' : 'Email OTP'} • TopTuitions Demo Project
        </p>
      </div>
    </div>
  );
};

export default UserProfile;