// src/redux/postsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],              // All posts from tuition owners
  loading: false,
  error: null,
  hasMore: true,          // For infinite scroll
  lastVisible: null,      // For Firestore pagination
};

export const postsSlice = createSlice({
  name: 'posts',
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

    // Set all posts (initial load)
    setPosts: (state, action) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },

    // Add new post (tuition owner creates post)
    addPost: (state, action) => {
      state.items.unshift(action.payload); // Add to beginning
      state.loading = false;
    },

    // Update existing post
    updatePost: (state, action) => {
      const index = state.items.findIndex(post => post.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },

    // Delete post
    deletePost: (state, action) => {
      state.items = state.items.filter(post => post.id !== action.payload);
    },

    // Load more posts (pagination)
    loadMorePosts: (state, action) => {
      state.items = [...state.items, ...action.payload.posts];
      state.lastVisible = action.payload.lastVisible;
      state.hasMore = action.payload.hasMore;
      state.loading = false;
    },

    // Increment like count on a post
    incrementLikes: (state, action) => {
      const post = state.items.find(p => p.id === action.payload);
      if (post) {
        post.likes = (post.likes || 0) + 1;
      }
    },

    // Decrement like count
    decrementLikes: (state, action) => {
      const post = state.items.find(p => p.id === action.payload);
      if (post && post.likes > 0) {
        post.likes -= 1;
      }
    },

    // Increment comment count
    incrementComments: (state, action) => {
      const post = state.items.find(p => p.id === action.payload);
      if (post) {
        post.comments = (post.comments || 0) + 1;
      }
    },

    // Increment enrollment count
    incrementEnrollments: (state, action) => {
      const post = state.items.find(p => p.id === action.payload);
      if (post) {
        post.enrollments = (post.enrollments || 0) + 1;
      }
    },

    // Clear all posts (on logout)
    clearPosts: (state) => {
      state.items = [];
      state.loading = false;
      state.error = null;
      state.hasMore = true;
      state.lastVisible = null;
    }
  },
});

// Export actions
export const {
  setLoading,
  setError,
  setPosts,
  addPost,
  updatePost,
  deletePost,
  loadMorePosts,
  incrementLikes,
  decrementLikes,
  incrementComments,
  incrementEnrollments,
  clearPosts
} = postsSlice.actions;

// Selectors
export const selectAllPosts = (state) => state.posts.items;
export const selectPostsLoading = (state) => state.posts.loading;
export const selectPostsError = (state) => state.posts.error;
export const selectHasMorePosts = (state) => state.posts.hasMore;

// Get posts by specific tuition owner
export const selectPostsByOwnerId = (ownerId) => (state) =>
  state.posts.items.filter(post => post.ownerId === ownerId);

export default postsSlice.reducer;