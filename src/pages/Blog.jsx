import React, { useState } from 'react';

// The Footer component is no longer needed here because it's in App.jsx

const blogs = [
  {
    id: 1,
    title: 'How to Choose the Best Tuition for You',
    description: 'Learn how to find the best tuition center that suits your needs.',
    fullContent:
      'Choosing the right tuition can be challenging. First, consider your learning style—whether you prefer one-on-one sessions, small groups, or online classes. Check the tutor’s qualifications, reviews, and past student success rates. Location, affordability, and flexible schedules are also crucial factors to consider. Always attend a demo class before making your final decision.',
    image: '/images/blog1.jpg',
  },
  {
    id: 2,
    title: 'Top 5 Coaching Centers in India',
    description: 'A list of the best coaching centers based on student reviews.',
    fullContent:
      '1. FIITJEE (Delhi) – Best for IIT-JEE preparation. \n2. Aakash Institute (Mumbai) – Known for medical entrance coaching. \n3. Allen (Kota) – Famous for JEE & NEET training. \n4. Resonance (Jaipur) – Excellent faculty and study material. \n5. Byju’s (Online) – Interactive online learning platform.',
    image: '/images/blog2.jpg',
  },
  {
    id: 3,
    title: 'Effective Study Tips for Students',
    description: 'Boost your learning with these scientifically proven study tips.',
    fullContent:
      'Effective study habits include setting a fixed schedule, using active recall, and practicing past papers. The Pomodoro technique (25-minute study sprints) boosts focus. Taking notes by hand improves retention. Avoid multitasking, and always revise concepts regularly. Lastly, get proper sleep and stay hydrated for better concentration.',
    image: '/images/blog3.avif',
  },
];

const Blog = () => {
  const [expandedBlog, setExpandedBlog] = useState(null);

  const toggleReadMore = (id) => {
    setExpandedBlog(expandedBlog === id ? null : id);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Our Blog</h1>

      <div className="relative w-full h-64 bg-gray-200 rounded-lg overflow-hidden mb-10">
        <img
          src="/images/featured-blog.png"
          alt="Featured Blog"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/40 text-white text-center p-6">
          <h2 className="text-3xl font-semibold">The Future of Online Learning</h2>
          <p className="mt-2 text-lg">How online tuition centers are transforming education.</p>
          <button
            onClick={() => toggleReadMore('featured')}
            className="mt-3 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {expandedBlog === 'featured' ? 'Show Less' : 'Read More'}
          </button>
          {expandedBlog === 'featured' && (
            <p className="mt-4 text-white text-sm">
              Online learning is revolutionizing education by making it more accessible, flexible,
              and interactive. AI-driven tutoring and personalized study plans are the future of
              education.
            </p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden p-4">
            <img src={blog.image} alt={blog.title} className="w-full h-40 object-cover" />
            <h3 className="text-xl font-semibold mt-2">{blog.title}</h3>
            <p className="text-gray-600 mt-2">{blog.description}</p>
            {expandedBlog === blog.id ? (
              <>
                <p className="text-gray-800 mt-2">{blog.fullContent}</p>
                <button
                  onClick={() => toggleReadMore(blog.id)}
                  className="text-red-500 mt-2 inline-block hover:underline"
                >
                  Show Less
                </button>
              </>
            ) : (
              <button
                onClick={() => toggleReadMore(blog.id)}
                className="text-blue-500 mt-2 inline-block hover:underline"
              >
                Read More →
              </button>
            )}
          </div>
        ))}
      </div>

      {/* --- The Footer component has been removed from here --- */}
    </div>
  );
};

export default Blog;
