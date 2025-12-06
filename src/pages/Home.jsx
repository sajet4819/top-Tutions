// src/pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUserType } from '../redux/authSlice';
import HeroSection from '../components/HeroSection';
import FeaturedTuitions from '../components/FeaturedTuitions';
import RecentPosts from '../components/RecentPosts';
import CTASection from '../components/CTASection';
import StatsSection from '../components/StatsSection';

const Home = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userType = useSelector(selectUserType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section - Main banner */}
      <HeroSection />

      {/* Stats Section - Show platform stats */}
      <StatsSection />

      {/* Featured Tuitions - Top tuition centers */}
      <FeaturedTuitions />

      {/* Recent Posts - Latest updates from tuitions (preview) */}
      <RecentPosts />

      {/* CTA Section - Call to action based on user state */}
      <CTASection />
    </div>
  );
};

export default Home;