import {useState } from "react";
import axios from "../../api/axios";
import { useAuth } from "../../contexts/AuthContext";

export default function Register() {
    const { login } = useAuth();
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const [err, setErr] = useState("");

    const handleChange = e => setForm({
        ...form,
        [e.target.name]: e.target.value
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr("");
        try {
            const { data } = await axios.post("/users/register", form);
            login(data.user, data.accessToken);
        } catch (error) {
            setErr(error.response?.data?.message || "Registration failed");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Username"
                required
            />
            <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                required
            />
            <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                required
            />
            <button type="submit">Register</button>
            {err && <div style={{ color: "red" }}>{err}</div>}
        </form>
    );
}