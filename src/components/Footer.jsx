import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-center p-6 mt-10">
      <h2 className="text-5xl font-bold text-black">
        Top<span className="text-blue-400">Tuitions</span>
      </h2>
      <div className="flex justify-center space-x-6 mt-4 text-gray-600 font-bold">
        {/* --- CHANGE: Converted all links to the <Link> component --- */}
        <Link to="/blog" className="hover:underline">
          Blog
        </Link>
        <Link to="/all-tuitions" className="hover:underline">
          All Tuitions
        </Link>
        <Link to="/about" className="hover:underline">
          About
        </Link>
      </div>
      <p className="text-gray-500 mt-2 text-sm">
        Terms & Conditions &bull; Privacy Policy &bull; All Rights Reserved
      </p>
      <p className="text-gray-400 text-xs mt-2 ">
        &copy; {new Date().getFullYear()} TopTuitions. All rights reserved.
      </p>
      <p className="text-gray-500 mt-2 text-sm">
        Designed and Developed by Sajet Dhopare
      </p>
    </footer>
  );
};

export default Footer;
