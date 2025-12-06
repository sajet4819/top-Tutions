// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { logout } from "../redux/authSlice";
import { selectUser, selectIsAuthenticated, selectUserType } from "../redux/authSlice";
import {
  FaInstagram,
  FaLinkedin,
  FaBars,
  FaTimes,
  FaUserCircle,
  FaSignOutAlt,
  FaChalkboardTeacher,
  FaGraduationCap,
  FaBell,
  FaHome,
  FaSearch,
  FaInfoCircle,
  FaNewspaper
} from "react-icons/fa";

const Navbar = () => {
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userType = useSelector(selectUserType);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [location]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      localStorage.removeItem("userType");
      navigate("/");
      setDropdownOpen(false);
      setIsOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
    setDropdownOpen(false);
  };

  const getDashboardRoute = () =>
    userType === "tuition_owner" ? "/tuition-dashboard" : "/student-dashboard";

  const getDashboardLabel = () =>
    userType === "tuition_owner" ? "Tuition Dashboard" : "Student Dashboard";

  const getDashboardIcon = () =>
    userType === "tuition_owner" ? (
      <FaChalkboardTeacher className="text-xl" />
    ) : (
      <FaGraduationCap className="text-xl" />
    );

  const isActive = (path) => location.pathname === path;

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'User';
  const userAvatar = user?.photoURL;

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white shadow-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex justify-between items-center">

        {/* LEFT: Logo (Mobile & Desktop) */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl md:text-3xl font-extrabold tracking-wide">
              <span className="text-black">Top</span>
              <span className=" bg-clip-text bg-gradient-to-r text-blue-600">Tuitions</span>
            </span>
          </Link>
        </div>

        {/* CENTER: Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link 
            to="/" 
            className={`flex items-center gap-2 font-semibold transition-all duration-300 ${
              isActive('/') 
                ? 'text-blue-600' 
                : 'text-gray-700 hover:text-blue-600'
            }`}
          >
            <FaHome className="text-lg" />
            Home
          </Link>
          <Link 
            to="/all-tuitions" 
            className={`flex items-center gap-2 font-semibold transition-all duration-300 ${
              isActive('/all-tuitions') 
                ? 'text-blue-600' 
                : 'text-gray-700 hover:text-blue-600'
            }`}
          >
            <FaSearch className="text-lg" />
            Tuitions
          </Link>
          <Link 
            to="/feed" 
            className={`flex items-center gap-2 font-semibold transition-all duration-300 ${
              isActive('/feed') 
                ? 'text-blue-600' 
                : 'text-gray-700 hover:text-blue-600'
            }`}
          >
            <FaNewspaper className="text-lg" />
            Feed
          </Link>
          <Link 
            to="/about" 
            className={`flex items-center gap-2 font-semibold transition-all duration-300 ${
              isActive('/about') 
                ? 'text-blue-600' 
                : 'text-gray-700 hover:text-blue-600'
            }`}
          >
            <FaInfoCircle className="text-lg" />
            About
          </Link>
        </div>

        {/* RIGHT: Profile/Login & Social Icons */}
        <div className="flex items-center gap-4">

          {/* Social Icons (Desktop Only) */}
          <div className="hidden lg:flex gap-4 items-center">
            <a 
              href="https://instagram.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-gray-600 hover:text-pink-600 transition"
            >
              <FaInstagram />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-gray-600 hover:text-blue-600 transition"
            >
              <FaLinkedin />
            </a>
          </div>

          {/* Profile/Login */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="focus:outline-none group"
              >
                {userAvatar ? (
                  <img
                    src={userAvatar}
                    alt="Profile"
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-blue-500 shadow-md group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-lg md:text-2xl font-bold shadow-md group-hover:scale-110 transition-transform duration-300">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                )}
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <>
                  {/* Backdrop */}
                  <div 
                    className="fixed inset-0 z-40"
                    onClick={() => setDropdownOpen(false)}
                  ></div>

                  {/* Dropdown */}
                  <div className="absolute right-0 mt-4 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-[slideDown_0.3s_ease-out]">

                    {/* Profile Header */}
                    <div className="p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-center border-b">
                      {userAvatar ? (
                        <img
                          src={userAvatar}
                          alt="Profile"
                          className="w-20 h-20 rounded-full mx-auto border-4 border-white shadow-lg"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mx-auto flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                          {displayName.charAt(0).toUpperCase()}
                        </div>
                      )}

                      <p className="mt-4 font-bold text-xl text-gray-800">
                        {displayName}
                      </p>
                      <p className="text-sm text-gray-600">
                        {user.email}
                      </p>
                      <div className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 border border-blue-200">
                        {userType === "tuition_owner" ? (
                          <>
                            <FaChalkboardTeacher className="text-purple-600" />
                            <span className="text-sm font-semibold text-purple-700">Tuition Owner</span>
                          </>
                        ) : (
                          <>
                            <FaGraduationCap className="text-blue-600" />
                            <span className="text-sm font-semibold text-blue-700">Student</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <button
                        onClick={() => handleNavigate(getDashboardRoute())}
                        className="w-full px-6 py-3 flex items-center gap-4 text-gray-700 hover:bg-blue-50 transition font-semibold"
                      >
                        {getDashboardIcon()}
                        <span>{getDashboardLabel()}</span>
                      </button>

                      <button
                        onClick={() => handleNavigate(userType === "student" ? "/profile" : "/tuition-profile")}
                        className="w-full px-6 py-3 flex items-center gap-4 text-gray-700 hover:bg-blue-50 transition font-semibold"
                      >
                        <FaUserCircle className="text-xl" />
                        My Profile
                      </button>

                      {userType === "tuition_owner" && (
                        <button
                          onClick={() => handleNavigate("/create-post")}
                          className="w-full px-6 py-3 flex items-center gap-4 text-gray-700 hover:bg-blue-50 transition font-semibold"
                        >
                          <FaBell className="text-xl" />
                          Create Post
                        </button>
                      )}
                    </div>

                    <div className="border-t"></div>

                    {/* Logout */}
                    <button
                      onClick={handleLogout}
                      className="w-full px-6 py-3 flex items-center gap-4 text-red-600 hover:bg-red-50 transition font-bold"
                    >
                      <FaSignOutAlt className="text-xl" /> 
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link
  to="/login"
  className="bg-black text-white px-6 py-2.5 md:px-8 md:py-3 rounded-full font-bold hover:bg-neutral-900 shadow-lg hover:shadow-xl transition-all duration-300 text-sm md:text-base"
>

              Sign In
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-3xl text-gray-700 hover:text-blue-600 transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Menu Content */}
          <div className="fixed top-[72px] left-0 right-0 bg-white shadow-2xl z-50 md:hidden animate-[slideDown_0.3s_ease-out] max-h-[calc(100vh-72px)] overflow-y-auto">
            <div className="py-6 px-4 space-y-2">

              <Link 
                to="/" 
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition ${
                  isActive('/') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FaHome className="text-xl" />
                Home
              </Link>

              <Link 
                to="/all-tuitions" 
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition ${
                  isActive('/all-tuitions') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FaSearch className="text-xl" />
                Tuitions
              </Link>

              <Link 
                to="/feed" 
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition ${
                  isActive('/feed') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FaNewspaper className="text-xl" />
                Feed
              </Link>

              <Link 
                to="/about" 
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition ${
                  isActive('/about') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FaInfoCircle className="text-xl" />
                About
              </Link>

              {/* Social Links */}
              <div className="flex gap-4 justify-center pt-4 border-t mt-4">
                <a 
                  href="https://instagram.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl text-pink-600 hover:scale-110 transition"
                >
                  <FaInstagram />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl text-blue-600 hover:scale-110 transition"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;