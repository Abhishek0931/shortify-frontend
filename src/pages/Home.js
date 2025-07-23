import UrlShortener from "../components/Url/UrlShortener";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const { user, logout } = useAuth();
  return (
    <div>
      <h1>Welcome to Shortify</h1>
      {user ? (
        <>
          <div style={{ color: 'green', marginBottom: '1rem' }}>Login successful!</div>
          <button onClick={logout} style={{ marginBottom: '1rem' }}>Logout</button>
          <UrlShortener />
        </>
      ) : (
        <div>Please log in to use the URL shortener.</div>
      )}
    </div>
  );
}