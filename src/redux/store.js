import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Import the reducer from authSlice

// The configureStore function sets up our global Redux store.
export const store = configureStore({
  // The 'reducer' object is where we combine all our different state slices.
  // For now, we only have one slice: 'auth'.
  reducer: {
    auth: authReducer,
  },
});

export default store;
