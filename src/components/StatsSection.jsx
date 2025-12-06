// src/components/StatsSection.jsx
import React from 'react';
import { FaGraduationCap, FaChalkboardTeacher, FaHeart, FaUsers } from 'react-icons/fa';

const StatsSection = () => {
  const stats = [
    {
      icon: <FaGraduationCap className="text-5xl" />,
      number: '1000+',
      label: 'Tuition Centers',
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      icon: <FaUsers className="text-5xl" />,
      number: '50,000+',
      label: 'Active Students',
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      icon: <FaChalkboardTeacher className="text-5xl" />,
      number: '5,000+',
      label: 'Expert Teachers',
      color: 'from-green-500 to-teal-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      icon: <FaHeart className="text-5xl" />,
      number: '100,000+',
      label: 'Happy Reviews',
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600'
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Trusted by Thousands
          </h2>
          <p className="text-lg text-gray-600">
            Join India's fastest growing education community
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-transparent hover:-translate-y-2"
            >
              {/* Icon with gradient background */}
              <div className={`${stat.bgColor} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <div className={stat.iconColor}>
                  {stat.icon}
                </div>
              </div>

              {/* Number */}
              <h3 className={`text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.number}
              </h3>

              {/* Label */}
              <p className="text-gray-600 font-semibold text-sm md:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-12">
          <p className="text-gray-600 text-lg">
            <span className="font-bold text-blue-600">Growing every day</span> - Be part of something amazing!
          </p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;