import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import {
  FaInstagram,
  FaLinkedin,
  FaBars,
  FaTimes,
  FaUserCircle,
  FaSignOutAlt,
  FaChalkboardTeacher,
  FaGraduationCap,
} from "react-icons/fa";

const Navbar = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/login");
    setDropdownOpen(false);
    setIsOpen(false);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
    setDropdownOpen(false);
  };

  const getDashboardRoute = () =>
    user?.role === "class" ? "/classdashboard" : "/studentdashboard";

  const getDashboardLabel = () =>
    user?.role === "class" ? "Manage Classes" : "My Dashboard";

  const getDashboardIcon = () =>
    user?.role === "class" ? (
      <FaChalkboardTeacher className="text-xl" />
    ) : (
      <FaGraduationCap className="text-xl" />
    );

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center relative">

        {/* MOBILE LOGO */}
        <div className="md:hidden flex items-center">
          <span
            onClick={() => navigate("/")}
            className="text-2xl font-extrabold tracking-wide cursor-pointer"
          >
            <span className="text-black">Top</span>
            <span className="text-blue-500">Tuitions</span>
          </span>
        </div>

        {/* LEFT ICONS (Desktop Only) */}
        <div className="hidden md:flex gap-6 items-center">
          <a className="text-2xl hover:text-blue-500 transition">
            <FaInstagram />
          </a>
          <a className="text-2xl hover:text-blue-500 transition">
            <FaLinkedin />
          </a>
        </div>

        {/* CENTER LOGO (Desktop Only) */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 cursor-pointer">
          <span
            onClick={() => navigate("/")}
            className="text-3xl font-extrabold tracking-wide"
          >
            <span className="text-black">Top</span>
            <span className="text-blue-500">Tuitions</span>
          </span>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-8">

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex gap-8 text-gray-700 font-medium">
            <Link to="/" className="hover:text-blue-500 transition">Home</Link>
            <Link to="/all-tuitions" className="hover:text-blue-500 transition">Tuitions</Link>
            <Link to="/about" className="hover:text-blue-500 transition">About</Link>
            <Link to="/blog" className="hover:text-blue-500 transition">Blog</Link>
          </div>

          {/* PROFILE */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="focus:outline-none"
              >
                {user.photo ? (
                  <img
                    src={user.photo}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow hover:scale-105 transition duration-200"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow">
                    {user.email?.[0].toUpperCase()}
                  </div>
                )}
              </button>

              {/* DROPDOWN */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-4 w-72 bg-white rounded-2xl shadow-xl border overflow-hidden animate-fade-in">

                  <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 text-center border-b">
                    {user.photo ? (
                      <img
                        src={user.photo}
                        className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-md"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mx-auto flex items-center justify-center text-white text-5xl font-bold shadow-md">
                        {user.email?.[0].toUpperCase()}
                      </div>
                    )}

                    <p className="mt-4 font-bold text-xl text-gray-800">
                      {user.name || user.email}
                    </p>
                    <p className="text-sm text-gray-600 capitalize font-medium">
                      {user.role === "class" ? "Class Owner" : "Student"}
                    </p>
                  </div>

                  <button
                    onClick={() => handleNavigate(getDashboardRoute())}
                    className="w-full px-6 py-4 flex items-center gap-4 text-gray-700 hover:bg-blue-50 transition"
                  >
                    {getDashboardIcon()}
                    <span className="font-semibold">{getDashboardLabel()}</span>
                  </button>

                  <button
                    onClick={() => handleNavigate("/userprofile")}
                    className="w-full px-6 py-4 flex items-center gap-4 text-gray-700 hover:bg-gray-100 transition"
                  >
                    <FaUserCircle className="text-xl" />
                    My Profile
                  </button>

                  <div className="border-t"></div>

                  <button
                    onClick={handleLogout}
                    className="w-full px-6 py-4 flex items-center gap-4 text-red-600 hover:bg-red-50 transition font-semibold"
                  >
                    <FaSignOutAlt className="text-xl" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-500 text-white px-7 py-3 rounded-full font-semibold hover:bg-blue-600 shadow-md transition"
            >
              Sign In
            </button>
          )}

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-3xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-xl py-8 text-center space-y-6 border-t animate-slide-down">

          <Link to="/" onClick={() => setIsOpen(false)} className="block text-lg text-gray-700 hover:text-blue-500">Home</Link>
          <Link to="/all-tuitions" onClick={() => setIsOpen(false)} className="block text-lg text-gray-700 hover:text-blue-500">Tuitions</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="block text-lg text-gray-700 hover:text-blue-500">About</Link>
          <Link to="/blog" onClick={() => setIsOpen(false)} className="block text-lg text-gray-700 hover:text-blue-500">Blog</Link>

          {isAuthenticated && user && (
            <>
              <div className="pt-6 border-t">
                {user.photo ? (
                  <img
                    src={user.photo}
                    className="w-28 h-28 rounded-full mx-auto border-4 border-blue-500 shadow-xl"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mx-auto flex items-center justify-center text-white text-5xl font-bold shadow-xl">
                    {user.email?.[0].toUpperCase()}
                  </div>
                )}

                <p className="mt-4 font-bold text-2xl">{user.name || user.email}</p>
                <p className="text-gray-600 capitalize">
                  {user.role === "class" ? "Class Owner" : "Student"}
                </p>
              </div>

              <button
                onClick={() => handleNavigate(getDashboardRoute())}
                className="bg-blue-500 text-white px-10 py-4 rounded-full text-lg font-bold shadow-lg mt-4"
              >
                {getDashboardLabel()}
              </button>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-12 py-4 rounded-full text-lg font-bold mt-4"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
