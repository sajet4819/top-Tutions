// src/components/LoginForm.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/authSlice';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from 'firebase/auth';
import { auth } from '../firebaseConfig.js';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [userType, setUserType] = useState('student');
  const [isPhoneLogin, setIsPhoneLogin] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) dispatch(login({ user: JSON.parse(saved) }));
  }, [dispatch]);

  const completeLogin = (firebaseUser) => {
    const appUser = {
      id: firebaseUser.uid,
      email: firebaseUser.email || firebaseUser.phoneNumber,
      name: firebaseUser.displayName || firebaseUser.phoneNumber?.slice(-10),
      photo: firebaseUser.photoURL || null,
      role: userType
    };
    localStorage.setItem('user', JSON.stringify(appUser));
    dispatch(login({ user: appUser }));
  };

  // GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      completeLogin(result.user);
    } catch (err) {
      alert('Google Login Failed: ' + err.message);
    }
  };

  // EMAIL + PASSWORD LOGIN
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      completeLogin(result.user);
    } catch (err) {
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
    const phoneNumber = '+91' + phone; // Change country code if needed

    try {
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(confirmation);
      setOtpSent(true);
      alert('OTP sent to ' + phoneNumber);
    } catch (err) {
      alert('Failed to send OTP: ' + err.message);
      window.recaptchaVerifier?.reset();
    }
  };

  // VERIFY PHONE OTP
  const handleVerifyPhoneOtp = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) return alert('Enter 6-digit OTP');

    try {
      const result = await confirmationResult.confirm(otp);
      completeLogin(result.user);
    } catch (err) {
      alert('Wrong OTP: ' + err.message);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/hero-bg.jpg')" }}></div>

      <div className="relative max-w-md w-full p-10 bg-white rounded-3xl shadow-2xl z-10">
        <div id="recaptcha-container"></div>

        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          {otpSent ? 'Enter OTP' : 'Welcome Back'}
        </h2>

        {/* User Type */}
        {!otpSent && (
          <div className="mb-8">
            <label className="block text-center text-sm font-medium text-gray-700 mb-3">I am a</label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="w-full p-4 border-2 border-gray-300 rounded-xl text-center text-lg font-medium focus:border-blue-500 transition"
            >
              <option value="student">Student</option>
              <option value="class">Class Owner</option>
            </select>
          </div>
        )}

        {/* EMAIL LOGIN */}
        {!otpSent && !isPhoneLogin && (
          <form onSubmit={handleEmailLogin} className="space-y-5">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-5 border-2 border-gray-300 rounded-xl text-lg focus:border-blue-500 transition"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-5 border-2 border-gray-300 rounded-xl text-lg focus:border-blue-500 transition"
              required
            />
            <button type="submit" className="w-full bg-blue-600 text-white py-5 rounded-xl font-bold text-lg hover:bg-blue-700 shadow-lg">
              Login with Email
            </button>
          </form>
        )}

        {/* PHONE OTP FLOW */}
        {!otpSent && isPhoneLogin && (
          <form onSubmit={handleSendPhoneOtp} className="space-y-5">
            <div className="flex items-center border-2 border-gray-300 rounded-xl overflow-hidden">
              <span className="px-4 text-lg bg-gray-100">+91</span>
              <input
                type="tel"
                placeholder="Enter 10-digit number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                className="w-full p-5 text-lg focus:outline-none"
                maxLength="10"
                required
              />
            </div>
            <button type="submit" className="w-full bg-green-600 text-white py-5 rounded-xl font-bold text-lg hover:bg-green-700 shadow-lg">
              Send OTP
            </button>
          </form>
        )}

        {/* OTP VERIFICATION */}
        {otpSent && (
          <form onSubmit={handleVerifyPhoneOtp} className="space-y-8">
            <div className="text-center">
              <p className="text-gray-700">OTP sent to</p>
              <p className="font-bold text-xl text-blue-600">+91 {phone}</p>
            </div>
            <input
              type="text"
              placeholder="______"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="w-full p-6 text-center text-4xl tracking-widest border-4 border-gray-300 rounded-2xl font-mono focus:border-blue-500"
              maxLength="6"
              autoFocus
            />
            <button type="submit" className="w-full bg-green-600 text-white py-5 rounded-xl font-bold text-xl hover:bg-green-700 shadow-lg">
              Verify OTP
            </button>
            <button
              type="button"
              onClick={() => { setOtpSent(false); setOtp(''); setPhone(''); }}
              className="text-blue-600 hover:underline w-full text-center"
            >
              ← Change Number
            </button>
          </form>
        )}

        {/* TOGGLE PHONE / EMAIL */}
        {!otpSent && (
          <div className="text-center my-6">
            <button
              onClick={() => setIsPhoneLogin(!isPhoneLogin)}
              className="text-blue-600 font-medium hover:underline"
            >
              {isPhoneLogin ? 'Use Email & Password' : 'Login with Phone OTP'}
            </button>
          </div>
        )}

        {/* DIVIDER */}
        {!otpSent && <div className="flex items-center my-8"><hr className="flex-1" /><span className="px-4 text-gray-500">OR</span><hr className="flex-1" /></div>}

        {/* GOOGLE LOGIN */}
        {!otpSent && (
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-4 bg-white border-2 border-gray-300 rounded-xl py-5 hover:shadow-xl transition font-semibold text-lg"
          >
            <img src="https://www.google.com/favicon.ico" alt="G" className="w-7 h-7" />
            Continue with Google
          </button>
        )}

        <p className="text-center text-xs text-gray-500 mt-8">
          Powered by Firebase • TopTuitions © 2025
        </p>
      </div>
    </div>
  );
}

export default LoginForm;