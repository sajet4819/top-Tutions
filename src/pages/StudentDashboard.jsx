// src/pages/StudentDashboard.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaBookOpen, FaClock, FaSearch, FaStar, FaCalendarAlt, FaTrophy } from 'react-icons/fa';

const StudentDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Fake enrolled classes (you can replace with real data later)
  const enrolledClasses = [
    { id: 1, subject: 'Mathematics', teacher: 'Prof. Sharma', time: 'Mon, Wed 5PM', progress: 75 },
    { id: 2, subject: 'Physics', teacher: 'Dr. Rajesh Kumar', time: 'Tue, Thu 6PM', progress: 60 },
    { id: 3, subject: 'Chemistry', teacher: 'Ms. Priya Singh', time: 'Fri 4PM', progress: 90 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Welcome Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Welcome back, <span className="text-blue-600">{user?.name?.split(' ')[0] || 'Student'}!</span>
          </h1>
          <p className="text-xl text-gray-600">Your learning journey continues</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center border border-blue-100">
            <FaBookOpen className="text-4xl text-blue-600 mx-auto mb-3" />
            <h3 className="text-3xl font-bold text-gray-800">{enrolledClasses.length}</h3>
            <p className="text-gray-600 font-medium">Enrolled Classes</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center border border-purple-100">
            <FaClock className="text-4xl text-purple-600 mx-auto mb-3" />
            <h3 className="text-3xl font-bold text-gray-800">12</h3>
            <p className="text-gray-600 font-medium">Hours This Week</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center border border-green-100">
            <FaTrophy className="text-4xl text-green-600 mx-auto mb-3" />
            <h3 className="text-3xl font-bold text-gray-800">A+</h3>
            <p className="text-gray-600 font-medium">Average Grade</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center border border-orange-100">
            <FaStar className="text-4xl text-orange-600 mx-auto mb-3" />
            <h3 className="text-3xl font-bold text-gray-800">4.8</h3>
            <p className="text-gray-600 font-medium">Rating</p>
          </div>
        </div>

        {/* My Classes Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">My Classes</h2>
            <button
              onClick={() => navigate('/all-tuitions')}
              className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition shadow-lg flex items-center gap-2"
            >
              <FaSearch /> Find New Classes
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {enrolledClasses.map((cls) => (
              <div key={cls.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100">
                <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative">
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-white font-bold text-sm">{cls.progress}% Complete</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{cls.subject}</h3>
                  <p className="text-gray-600 mb-4 flex items-center gap-2">
                    <FaUserGraduate className="text-blue-600" />
                    {cls.teacher}
                  </p>
                  <p className="text-gray-600 mb-6 flex items-center gap-2">
                    <FaCalendarAlt className="text-purple-600" />
                    {cls.time}
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Progress</span>
                      <span>{cls.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000"
                        style={{ width: `${cls.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
                    Continue Learning
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Classes */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-blue-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <FaCalendarAlt className="text-blue-600" /> Upcoming Classes
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
              <div>
                <h3 className="text-xl font-bold text-gray-800">Mathematics - Calculus</h3>
                <p className="text-gray-600">with Prof. Sharma</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">Today</p>
                <p className="text-gray-600">5:00 PM - 6:30 PM</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border">
              <div>
                <h3 className="text-xl font-bold text-gray-800">Physics - Mechanics</h3>
                <p className="text-gray-600">with Dr. Rajesh Kumar</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-purple-600">Tomorrow</p>
                <p className="text-gray-600">6:00 PM - 7:30 PM</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-500 mt-16 text-sm">
          TopTuitions • Your Success, Our Priority
        </p>
      </div>
    </div>
  );
};

export default StudentDashboard;