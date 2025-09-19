
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Home from "./pages/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Profile from "./components/User/Profile";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav style={{ marginBottom: 16 }}>
      <Link to="/">Home</Link>
      {user ? (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/profile">Profile</Link>
          <button onClick={logout} style={{ marginLeft: 8 }}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

// Route protection wrapper
function PrivateRoute({ element }) {
  const { user } = useAuth();
  return user ? element : <Navigate to="/login" replace />;
}
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
        <ToastContainer position="top-center" autoClose={2000} />
      </BrowserRouter>
    </AuthProvider>
  );
}