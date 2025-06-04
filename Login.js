
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!email) newErrors.email = "Email is required";
        if (!password) newErrors.password = "Password is required";
        else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";

        setError(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const submit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            const data = { email, password };
            const res = await axios.post("http://localhost:5000/login", data);

            if (res.data.error) {
                alert(res.data.error);
                return;
            }
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("name", res.data.name);

            navigate("/home");

        } catch (err) {
            console.error("Login error:", err);
            alert("Server error. Please try later.");
        }
    };

    return (
        <form onSubmit={submit}>
            <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                    setError({ ...error, email: "" });
                }}
            />
            {error.email && <p style={{ color: "red" }}>{error.email}</p>}

            <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                    setError({ ...error, password: "" });
                }}
            />
            {error.password && <p style={{ color: "red" }}>{error.password}</p>}

            <button type="submit">Submit</button>
            <button type="button" onClick={() => navigate("/")}>Cancel</button>
        </form>
    );
}

export default Login;
