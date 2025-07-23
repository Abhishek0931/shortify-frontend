import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Home from "./pages/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Profile from "./components/User/Profile";

function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav>
      <Link to = "/">Home</Link>
      {user ? (
        <>
          <Link to = "/profile">Profile</Link>
          <button onClick={logout}></button>
        </>
      ) : (
        <>
          <Link to = "/login">Login</Link>
          <Link to = "/register">Register</Link>
        </>
      )}
    </nav>
  );
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
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<div>Page not found</div>} />  
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}