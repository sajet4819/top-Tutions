import React from 'react';

// The Footer component is no longer needed here because it's in App.jsx

const About = () => {
  return (
    <div>
      {/* Top Image Section */}
      <div className="w-full">
        <img
          src="/images/blog-bg.png" // Replace with the correct path to your image
          alt="About TopTuitions"
          className="w-full h-64 object-cover"
        />
      </div>

      {/* About Content */}
      <div className="max-w-4xl mx-auto px-4 py-10 text-center">
        <h2 className="text-3xl font-bold text-gray-800">About TopTuitions</h2>
        <p className="mt-4 text-gray-600">
          At TopTuitions, we believe that finding the right tuition center plays a crucial role in
          shaping your education. That’s why we've built a platform where students and parents can
          share honest reviews and real opinions about tuition classes.
        </p>
        <p className="mt-4 text-gray-600">
          Our goal is to build a strong network where students can help each other by providing
          authentic feedback, making the process of choosing a tuition center easier and more
          transparent.
        </p>
        <p className="mt-4 text-gray-600">
          Have questions? Visit our{' '}
          <a href="/help" className="text-blue-500">
            help page
          </a>{' '}
          or contact us at{' '}
          <a href="mailto:contact@toptuitions.com" className="text-blue-500">
            contact@toptuitions.com
          </a>
          .
        </p>
      </div>

      {/* --- The Footer component has been removed from here --- */}
    </div>
  );
};

export default About;
