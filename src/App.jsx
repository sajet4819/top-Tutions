// src/App.jsx
import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';
import { login, logout, setLoading } from './redux/authSlice';
import { selectIsAuthenticated, selectUserType } from './redux/authSlice';

// Import Layout & Pages
import Layout from './components/Layout';
import Home from './pages/Home';
import Feed from './pages/Feed';
import TuitionDetails from './pages/TuitionDetails';
import About from './pages/About';
import LoginForm from './pages/LoginForm';
import UserProfile from './pages/UserProfile';
import StudentDashboard from './pages/StudentDashboard';
import TuitionDashboard from './pages/TuitionDashboard';
import CreatePost from './pages/CreatePost';
import AllTuitions from './pages/AllTuitions';

// Protected Route Component
const ProtectedRoute = ({ children, allowedUserType }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userType = useSelector(selectUserType);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedUserType && userType !== allowedUserType) {
    // Redirect to appropriate dashboard if wrong user type
    return <Navigate to={userType === 'student' ? '/student-dashboard' : '/tuition-dashboard'} replace />;
  }

  return children;
};

const App = () => {
  const dispatch = useDispatch();

  // Listen to Firebase auth state changes
  useEffect(() => {
    dispatch(setLoading(true));

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Get user profile from Firestore
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userProfile = userDoc.data();
            
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
          } else {
            // User document doesn't exist in Firestore
            console.error('User profile not found in Firestore');
            dispatch(logout());
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          dispatch(logout());
        }
      } else {
        // User is signed out
        dispatch(logout());
      }
      
      dispatch(setLoading(false));
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Routes>
      {/* Public Routes with Layout (Navbar visible) */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/about" element={<About />} />
        <Route path="/all-tuitions" element={<AllTuitions />} />
        <Route path="/tuition/:id" element={<TuitionDetails />} />
        <Route path="/login" element={<LoginForm />} />

        {/* Protected Routes - Student Only */}
        <Route 
          path="/student-dashboard" 
          element={
            <ProtectedRoute allowedUserType="student">
              <StudentDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute allowedUserType="student">
              <UserProfile />
            </ProtectedRoute>
          } 
        />

        {/* Protected Routes - Tuition Owner Only */}
        <Route 
          path="/tuition-dashboard" 
          element={
            <ProtectedRoute allowedUserType="tuition_owner">
              <TuitionDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/create-post" 
          element={
            <ProtectedRoute allowedUserType="tuition_owner">
              <CreatePost />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/tuition-profile" 
          element={
            <ProtectedRoute allowedUserType="tuition_owner">
              <UserProfile />
            </ProtectedRoute>
          } 
        />

        {/* Catch all - Redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default App;