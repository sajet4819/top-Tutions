import { createSlice } from '@reduxjs/toolkit';

// This is the initial state of our "auth" slice.
// It defines what the auth state looks like when the app first loads.
const initialState = {
  user: null,       // Will hold user data from Supabase (like email, id)
  token: null,      // We can store the JWT token here if needed
  userType: null,   // Will hold 'student' or 'class'
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  // Reducers are functions that define how the state can be updated.
  reducers: {
    // This action is called when a user successfully logs in or signs up.
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token; // You can pass the token from Supabase session
      state.userType = action.payload.userType; // Pass 'student' or 'class'
      state.isAuthenticated = true;
    },
    // This action is called when a user logs out.
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.userType = null;
      state.isAuthenticated = false;
    },
    // You can add a register action if you need to handle specific
    // registration logic, but often login can handle the session creation.
    register: (state, action) => {
        // For now, registration success can be handled by the login flow
        // after email verification. You can add specific logic here if needed.
        console.log("Registration action dispatched:", action.payload);
    }
  },
});

// Export the actions so we can use them in our components (e.g., dispatch(login()))
export const { login, logout, register } = authSlice.actions;

// Export the reducer so we can add it to our Redux store
export default authSlice.reducer;
