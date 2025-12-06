// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import postsReducer from './postsSlice';
import enrollmentsReducer from './enrollmentsSlice';

// Configure the Redux store with all our slices
export const store = configureStore({
  reducer: {
    auth: authReducer,              // User authentication & profile
    posts: postsReducer,            // Tuition posts/feed
    enrollments: enrollmentsReducer, // Student enrollments & interactions
  },
  // Middleware to handle non-serializable values (like Firebase timestamps)
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['posts/addPost', 'posts/updatePost'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.timestamp', 'payload.createdAt'],
        // Ignore these paths in the state
        ignoredPaths: ['posts.items', 'enrollments.items'],
      },
    }),
});

export default store;