export default function UrlStats({ url }) {
	// Show click count and created date if available
	return (
		<div style={{ fontSize: 12 }}>
			{typeof url.clicks !== "undefined" && (
				<span>Clicks: {url.clicks} <br /></span>
			)}
			{url.createdAt && (
				<span>Created: {new Date(url.createdAt).toLocaleString()}</span>
			)}
		</div>
	);
}
