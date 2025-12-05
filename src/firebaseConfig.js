// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCAgxz3RRCpM30oKAkL0LbX7oO36aWF5M0",
  authDomain: "toptuitions-b9828.firebaseapp.com",
  projectId: "toptuitions-b9828",
  storageBucket: "toptuitions-b9828.firebasestorage.app",
  messagingSenderId: "111342017678",
  appId: "1:111342017678:web:ec857910374a5f3515bddf",
  measurementId: "G-2MYKFS7JTQ"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);