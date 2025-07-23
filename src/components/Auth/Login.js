import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";   
import axios from "../../api/axios";

export default function Login() {
    const { user, login, logout } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/users/login", { email, password });
            login(data.user, data.accessToken);
            setSuccess(true);
        } catch (error) {
            setErr(error.response?.data?.message || "Login failed");
        }
    };

    if (user && success) {
        return (
            <div>
                <div style={{ color: 'green', marginBottom: '1rem' }}>Login successful!</div>
                <button onClick={logout} style={{ marginBottom: '1rem' }}>Logout</button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Login</button>

            {err && <div style={{ color: "red" }}>{err}</div>}
        </form>
    );
}