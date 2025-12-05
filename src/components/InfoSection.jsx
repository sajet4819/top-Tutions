import React from 'react';

const InfoSection = () => {
  return (
    <div className="w-full py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* First Block */}
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4">Find your tuition</h2>
          <p className="text-gray-600">
            Find the best tuition centers with ease! We've gathered reviews from thousands of
            students and parents to help you make an informed choice. Simply search for your
            tuition center and explore genuine feedback to get started on your learning journey.
          </p>
        </div>
        <div>
          <img src="/images/search-tuition.png" alt="Search Tuition" className="w-full h-auto max-w-sm mx-auto" />
        </div>

        {/* Second Block */}
        <div className="order-last md:order-none">
          <img src="/images/write-review.png" alt="Write Review" className="w-full h-auto max-w-sm mx-auto" />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4">Write an anonymous review</h2>
          <p className="text-gray-600">
            Share your experience at your tuition center by writing a review and helping others
            make informed decisions. Your feedback is completely anonymous, ensuring privacy while
            contributing to a trusted community of learners.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
