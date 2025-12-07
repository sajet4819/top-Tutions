// src/pages/LoginForm.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, setLoading, setError } from '../redux/authSlice';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { FaGoogle, FaUser, FaChalkboardTeacher, FaEnvelope, FaLock, FaPhone } from 'react-icons/fa';

function LoginForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [userType, setUserType] = useState('student');
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'phone'

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      // Redirect based on user type
      const userType = localStorage.getItem('userType');
      navigate(userType === 'student' ? '/student-dashboard' : '/tuition-dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Create or get user profile from Firestore
  const createOrGetUserProfile = async (firebaseUser, selectedUserType) => {
    const userDocRef = doc(db, 'users', firebaseUser.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      // User exists, return existing profile
      return userDoc.data();
    } else {
      // New user, create profile
      const newProfile = {
        email: firebaseUser.email || firebaseUser.phoneNumber || '',
        name: name || firebaseUser.displayName || firebaseUser.phoneNumber?.slice(-10) || 'User',
        userType: selectedUserType,
        photoURL: firebaseUser.photoURL || null,
        bio: '',
        location: '',
        createdAt: serverTimestamp(),
      };

      // Add tuition-specific fields if owner
      if (selectedUserType === 'tuition_owner') {
        newProfile.tuitionName = '';
        newProfile.subjects = [];
        newProfile.verified = false;
      }

      await setDoc(userDocRef, newProfile);
      return newProfile;
    }
  };

  const completeLogin = async (firebaseUser, selectedUserType) => {
    try {
      dispatch(setLoading(true));
      
      const userProfile = await createOrGetUserProfile(firebaseUser, selectedUserType);
      
      dispatch(login({
        user: {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        },
        userType: userProfile.userType,
        userProfile: userProfile,
      }));

      // Store userType in localStorage for quick access
      localStorage.setItem('userType', userProfile.userType);
      
    } catch (error) {
      console.error('Error completing login:', error);
      dispatch(setError(error.message));
    }
  };

  // GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      dispatch(setLoading(true));
      const result = await signInWithPopup(auth, provider);
      await completeLogin(result.user, userType);
    } catch (err) {
      dispatch(setError(err.message));
      alert('Google Login Failed: ' + err.message);
    }
  };

  // EMAIL SIGN UP
  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    if (!name.trim()) return alert('Please enter your name');
    
    try {
      dispatch(setLoading(true));
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await completeLogin(result.user, userType);
    } catch (err) {
      dispatch(setError(err.message));
      alert('Sign Up Failed: ' + err.message);
    }
  };

  // EMAIL LOGIN
  const handleEmailLogin = async (e) => {
    e.preventDefault();
      // ---------- POV TEST ACCOUNTS (No Firebase Needed) ----------
  if (email === "adminstudent@123" && password === "123") {
    dispatch(login({
      user: {
        uid: "STUDENT-ADMIN-UID",
        email: "adminstudent@123",
        displayName: "Admin Student View",
        photoURL: null
      },
      userType: "student",
      userProfile: {
        name: "Admin Student POV",
        email: "adminstudent@123",
        userType: "student"
      }
    }));
  
    localStorage.setItem("userType", "student");
    navigate("/student-dashboard");
    return;
  }

  if (email === "adminclassowner@123" && password === "123") {
    dispatch(login({
      user: {
        uid: "OWNER-ADMIN-UID",
        email: "adminclassowner@123",
        displayName: "Admin Class Owner View",
        photoURL: null
      },
      userType: "tuition_owner",
      userProfile: {
        name: "Admin Owner POV",
        email: "adminclassowner@123",
        userType: "tuition_owner"
      }
    }));
  
    localStorage.setItem("userType", "tuition_owner");
    navigate("/tuition-dashboard");
    return;
  }

    try {
      dispatch(setLoading(true));
      const result = await signInWithEmailAndPassword(auth, email, password);
      await completeLogin(result.user, userType);
    } catch (err) {
      dispatch(setError(err.message));
      alert('Login Failed: ' + err.message);
    }
  };

  // PHONE OTP - Setup Recaptcha
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {}
      });
    }
  };

  // SEND PHONE OTP
  const handleSendPhoneOtp = async (e) => {
    e.preventDefault();
    if (!phone.match(/^\d{10}$/)) return alert('Enter valid 10-digit number');

    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    const phoneNumber = '+91' + phone;

    try {
      dispatch(setLoading(true));
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(confirmation);
      setOtpSent(true);
      alert('OTP sent to ' + phoneNumber);
      dispatch(setLoading(false));
    } catch (err) {
      dispatch(setError(err.message));
      alert('Failed to send OTP: ' + err.message);
      window.recaptchaVerifier?.clear();
    }
  };

  // VERIFY PHONE OTP
  const handleVerifyPhoneOtp = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) return alert('Enter 6-digit OTP');

    try {
      dispatch(setLoading(true));
      const result = await confirmationResult.confirm(otp);
      await completeLogin(result.user, userType);
    } catch (err) {
      dispatch(setError(err.message));
      alert('Wrong OTP: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 py-12 px-4">
      <div id="recaptcha-container"></div>

      <div className="max-w-md w-full">
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {otpSent ? 'Verify OTP' : isSignUp ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-gray-600">
            {otpSent ? 'Enter the code sent to your phone' : isSignUp ? 'Join our learning community' : 'Sign in to continue'}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {/* User Type Selection */}
          {!otpSent && (
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">I am a:</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setUserType('student')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    userType === 'student'
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <FaUser className="text-2xl mx-auto mb-2" />
                  <span className="font-semibold">Student</span>
                </button>
                <button
                  type="button"
                  onClick={() => setUserType('tuition_owner')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    userType === 'tuition_owner'
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <FaChalkboardTeacher className="text-2xl mx-auto mb-2" />
                  <span className="font-semibold">Tuition Owner</span>
                </button>
              </div>
            </div>
          )}

          {/* Login Method Tabs */}
          {!otpSent && (
            <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setLoginMethod('email')}
                className={`flex-1 py-2 rounded-lg font-semibold transition ${
                  loginMethod === 'email' ? 'bg-white shadow' : 'text-gray-600'
                }`}
              >
                <FaEnvelope className="inline mr-2" />
                Email
              </button>
              <button
                onClick={() => setLoginMethod('phone')}
                className={`flex-1 py-2 rounded-lg font-semibold transition ${
                  loginMethod === 'phone' ? 'bg-white shadow' : 'text-gray-600'
                }`}
              >
                <FaPhone className="inline mr-2" />
                Phone
              </button>
            </div>
          )}

          {/* EMAIL FORMS */}
          {!otpSent && loginMethod === 'email' && (
            <form onSubmit={isSignUp ? handleEmailSignUp : handleEmailLogin} className="space-y-4">
              {isSignUp && (
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition"
                  required
                />
              )}
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 shadow-lg transition disabled:opacity-50"
              >
                {loading ? 'Please wait...' : isSignUp ? 'Sign Up' : 'Login'}
              </button>
            </form>
          )}

          {/* PHONE OTP FLOW */}
          {!otpSent && loginMethod === 'phone' && (
            <form onSubmit={handleSendPhoneOtp} className="space-y-4">
              {isSignUp && (
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition"
                  required
                />
              )}
              <div className="flex items-center border-2 border-gray-300 rounded-xl overflow-hidden focus-within:border-blue-500 transition">
                <span className="px-4 text-lg bg-gray-100 font-semibold">+91</span>
                <input
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="w-full p-4 focus:outline-none"
                  maxLength="10"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-teal-700 shadow-lg transition disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send OTP'}
              </button>
            </form>
          )}

          {/* OTP VERIFICATION */}
          {otpSent && (
            <form onSubmit={handleVerifyPhoneOtp} className="space-y-6">
              <div className="text-center bg-blue-50 p-4 rounded-xl">
                <p className="text-gray-700 mb-1">OTP sent to</p>
                <p className="font-bold text-xl text-blue-600">+91 {phone}</p>
              </div>
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="w-full p-6 text-center text-3xl tracking-widest border-2 border-gray-300 rounded-xl font-mono focus:border-blue-500 focus:outline-none"
                maxLength="6"
                autoFocus
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-teal-700 shadow-lg transition disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
              <button
                type="button"
                onClick={() => { setOtpSent(false); setOtp(''); }}
                className="text-blue-600 hover:underline w-full text-center font-semibold"
              >
                ← Change Number
              </button>
            </form>
          )}

          {/* Toggle Sign Up / Login */}
          {!otpSent && (
            <div className="text-center mt-6">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-blue-600 font-semibold hover:underline"
              >
                {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
              </button>
            </div>
          )}

          {/* DIVIDER */}
          {!otpSent && (
            <div className="flex items-center my-6">
              <hr className="flex-1 border-gray-300" />
              <span className="px-4 text-gray-500 font-medium">OR</span>
              <hr className="flex-1 border-gray-300" />
            </div>
          )}

          {/* GOOGLE LOGIN */}
          {!otpSent && (
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 rounded-xl py-4 hover:shadow-lg hover:border-gray-400 transition font-semibold text-lg disabled:opacity-50"
            >
              <FaGoogle className="text-red-500 text-xl" />
              Continue with Google
            </button>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}

export default LoginForm;