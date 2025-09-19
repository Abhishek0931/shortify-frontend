import { useEffect, useState } from "react";
import axios from "../api/axios";
import UrlList from "../components/Url/UrlList";
import UrlShortener from "../components/Url/UrlShortener";

export default function Dashboard() {
	const [urls, setUrls] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	const fetchUrls = async () => {
		setLoading(true);
		setError("");
		try {
			const { data } = await axios.get("/api/urls/my");
			setUrls(data.urls || data); // support both {urls:[]} and []
		} catch (err) {
			setError(err.response?.data?.message || "Failed to fetch URLs");
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchUrls();
	}, []);

	// For updating list after shortening
	const handleShorten = () => fetchUrls();

	return (
		<div>
			<h2>My URLs</h2>
			<UrlShortener onShorten={handleShorten} />
			{loading ? (
				<div>Loading...</div>
			) : error ? (
				<div style={{ color: "red" }}>{error}</div>
			) : (
				<UrlList urls={urls} />
			)}
		</div>
	);
}
