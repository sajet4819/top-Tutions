// src/redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,              // Firebase user object (uid, email, displayName, photoURL)
  userType: null,          // 'student' or 'tuition_owner'
  userProfile: null,       // Additional user data from Firestore (bio, location, etc.)
  isAuthenticated: false,
  loading: false,          // For async operations
  error: null,             // Store any auth errors
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    // Set error
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Login action - called after Firebase auth success
    login: (state, action) => {
      state.user = action.payload.user;           // Firebase user (uid, email, etc.)
      state.userType = action.payload.userType;   // 'student' or 'tuition_owner'
      state.userProfile = action.payload.userProfile || null; // Firestore profile data
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },

    // Update user profile (after editing profile, etc.)
    updateProfile: (state, action) => {
      state.userProfile = {
        ...state.userProfile,
        ...action.payload
      };
    },

    // Logout action
    logout: (state) => {
      state.user = null;
      state.userType = null;
      state.userProfile = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    }
  },
});

// Export actions
export const { 
  login, 
  logout, 
  updateProfile, 
  setLoading, 
  setError, 
  clearError 
} = authSlice.actions;

// Selectors (helper functions to get data from state)
export const selectUser = (state) => state.auth.user;
export const selectUserType = (state) => state.auth.userType;
export const selectUserProfile = (state) => state.auth.userProfile;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;

// Check if user is tuition owner
export const selectIsTuitionOwner = (state) => state.auth.userType === 'tuition_owner';

// Check if user is student
export const selectIsStudent = (state) => state.auth.userType === 'student';

export default authSlice.reducer;