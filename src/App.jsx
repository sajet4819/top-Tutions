import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from './redux/authSlice'; // logout not needed anymore

// Import Layout & Pages
import Layout from './components/Layout';
import Home from './pages/Home';
import TuitionDetails from './pages/TuitionDetails';
import About from './pages/About';
import Blog from './pages/Blog';
import AllTuitions from './pages/AllTuitions';
import LoginForm from './pages/LoginForm';
import UserProfile from './pages/UserProfile';

// Placeholder Dashboards
const StudentDashboard = () => <div className="p-8"><h1>Welcome, Student!</h1></div>;
const ClassDashboard = () => <div className="p-8"><h1>Welcome, Class Owner!</h1></div>;

const App = () => {
  const dispatch = useDispatch();

  // Auto-login on page refresh (from localStorage)
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch(login({ user }));
      } catch (err) {
        localStorage.removeItem('user');
      }
    }
  }, [dispatch]);

  return (
    <Routes>
      {/* All pages including Login use Layout → Navbar visible everywhere */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="userprofile" element={<UserProfile />} />
        <Route path="tuition/:id" element={<TuitionDetails />} />
        <Route path="about" element={<About />} />
        <Route path="blog" element={<Blog />} />
        <Route path="all-tuitions" element={<AllTuitions />} />
        <Route path="studentdashboard" element={<StudentDashboard />} />
        <Route path="classdashboard" element={<ClassDashboard />} />
        <Route path="/login" element={<LoginForm />} />
      </Route>
    </Routes>
  );
};

export default App;