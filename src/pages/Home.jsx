import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedTuitions from '../components/FeaturedTuitions';
import InfoSection from '../components/InfoSection';

// The Footer component is no longer needed here because it's in App.jsx

const Home = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedTuitions />
      <InfoSection />
      {/* --- The Footer component has been removed from here --- */}
    </div>
  );
};

export default Home;
