// src/redux/enrollmentsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  enrolledTuitions: [],    // Tuitions the student has enrolled in
  likedPosts: [],          // Post IDs the student has liked
  myComments: [],          // Comments made by the student
  loading: false,
  error: null,
};

export const enrollmentsSlice = createSlice({
  name: 'enrollments',
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

    // Set enrolled tuitions
    setEnrolledTuitions: (state, action) => {
      state.enrolledTuitions = action.payload;
      state.loading = false;
    },

    // Add enrollment
    addEnrollment: (state, action) => {
      const exists = state.enrolledTuitions.find(e => e.tuitionId === action.payload.tuitionId);
      if (!exists) {
        state.enrolledTuitions.push(action.payload);
      }
    },

    // Remove enrollment
    removeEnrollment: (state, action) => {
      state.enrolledTuitions = state.enrolledTuitions.filter(
        e => e.tuitionId !== action.payload
      );
    },

    // Set liked posts
    setLikedPosts: (state, action) => {
      state.likedPosts = action.payload;
      state.loading = false;
    },

    // Add like
    addLike: (state, action) => {
      if (!state.likedPosts.includes(action.payload)) {
        state.likedPosts.push(action.payload);
      }
    },

    // Remove like
    removeLike: (state, action) => {
      state.likedPosts = state.likedPosts.filter(id => id !== action.payload);
    },

    // Set user's comments
    setMyComments: (state, action) => {
      state.myComments = action.payload;
      state.loading = false;
    },

    // Add comment
    addComment: (state, action) => {
      state.myComments.push(action.payload);
    },

    // Delete comment
    deleteComment: (state, action) => {
      state.myComments = state.myComments.filter(c => c.id !== action.payload);
    },

    // Clear all enrollments (on logout)
    clearEnrollments: (state) => {
      state.enrolledTuitions = [];
      state.likedPosts = [];
      state.myComments = [];
      state.loading = false;
      state.error = null;
    }
  },
});

// Export actions
export const {
  setLoading,
  setError,
  setEnrolledTuitions,
  addEnrollment,
  removeEnrollment,
  setLikedPosts,
  addLike,
  removeLike,
  setMyComments,
  addComment,
  deleteComment,
  clearEnrollments
} = enrollmentsSlice.actions;

// Selectors
export const selectEnrolledTuitions = (state) => state.enrollments.enrolledTuitions;
export const selectLikedPosts = (state) => state.enrollments.likedPosts;
export const selectMyComments = (state) => state.enrollments.myComments;
export const selectEnrollmentsLoading = (state) => state.enrollments.loading;

// Check if user is enrolled in a specific tuition
export const selectIsEnrolled = (tuitionId) => (state) =>
  state.enrollments.enrolledTuitions.some(e => e.tuitionId === tuitionId);

// Check if user has liked a specific post
export const selectHasLikedPost = (postId) => (state) =>
  state.enrollments.likedPosts.includes(postId);

export default enrollmentsSlice.reducer;