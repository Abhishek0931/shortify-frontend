import UrlShortener from "../components/Url/UrlShortener";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const { user, logout } = useAuth();
  return (
    <div>
      <h1>Welcome to Shortify</h1>
      {user ? (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ color: 'green', marginBottom: '0.5rem' }}>Login successful!</div>
            <button onClick={logout} style={{ marginBottom: '0.5rem', padding: '0.5rem 1rem', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Logout</button>
          </div>
          <UrlShortener />
        </>
      ) : (
        <div>Please log in to use the URL shortener.</div>
      )}
    </div>
  );
}