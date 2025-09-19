
import UrlStats from "./UrlStats";
import { useState } from "react";

// Use backend base URL for short links
const BACKEND_BASE_URL = process.env.REACT_APP_API_BASE_URL?.replace(/\/$/, "") || "http://localhost:5000";

export default function UrlList({ urls }) {
	if (!urls || urls.length === 0) return <div>No URLs found.</div>;
	return (
		<table style={{ width: "100%", borderCollapse: "collapse", marginTop: 16 }}>
			<thead>
				<tr>
					<th>Short URL</th>
					<th>Original URL</th>
					<th>Stats</th>
					<th>Copy</th>
				</tr>
			</thead>
			<tbody>
				{urls.map((url) => (
					<UrlRow key={url._id || url.shortCode} url={url} />
				))}
			</tbody>
		</table>
	);
}

function UrlRow({ url }) {
	const [copied, setCopied] = useState(false);
	// Always use backend base URL for short links
	const shortUrl = url.shortUrl || `${BACKEND_BASE_URL}/${url.shortCode}`;
	const handleCopy = () => {
		navigator.clipboard.writeText(shortUrl);
		setCopied(true);
		setTimeout(() => setCopied(false), 1200);
	};
	return (
		<tr>
			<td><a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a></td>
			<td style={{ maxWidth: 300, overflowWrap: "break-word" }}>{url.originalUrl}</td>
			<td><UrlStats url={url} /></td>
			<td>
				<button onClick={handleCopy}>{copied ? "Copied!" : "Copy"}</button>
			</td>
		</tr>
	);
}
