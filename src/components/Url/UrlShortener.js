
import { useState } from "react";
import axios from "../../api/axios";

// Use backend base URL for short links
const BACKEND_BASE_URL = process.env.REACT_APP_API_BASE_URL?.replace(/\/$/, "") || "http://localhost:5000";

export default function UrlShortener({ onShorten }) {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    setShortUrl("");
    setError("");
    try {
      const res = await axios.post("/api/urls/shorten", { originalUrl });
      // Always use backend base URL for short links
      const code = res.data.shortUrl?.split("/").pop() || res.data.shortCode;
      setShortUrl(`${BACKEND_BASE_URL}/${code}`);
      setOriginalUrl("");
      if (onShorten) onShorten();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <h2>URL Shortener</h2>
      <form onSubmit={handleSubmit}>
        <input value={originalUrl} onChange={e => setOriginalUrl(e.target.value)} placeholder="Enter URL" required />
        <button type="submit">Shorten</button>
      </form>
      {shortUrl && <div>Shortened URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a></div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}