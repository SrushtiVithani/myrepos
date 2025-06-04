
import React, { useState } from "react";
import './Register.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!name) newErrors.name = "Name is required";
        if (!email) newErrors.email = "Email is required";
        if (!phone) newErrors.phone = "Phone is required";
        if (!gender) newErrors.gender = "Gender is required";
        if (!password) newErrors.password = "Password is required";
        else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";

        setError(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const Submit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const data = { name, email, phone, gender, password };

        try {
            const res= await axios.post("http://localhost:5000/register", data);

                navigate("/login");

        } catch (err) {
            console.error("Registration error", err);
            alert("Server error. Please try later.");
        }
    };

    return (
        <form onSubmit={Submit}>
            <input type="text" placeholder="Enter username"
                onChange={(e) => {
                    setName(e.target.value);
                    setError({ ...error, name: "" });
                }} />
            {error.name && <p style={{ color: "red" }}>{error.name}</p>}

            <input type="email" placeholder="Enter email"
                onChange={(e) => {
                    setEmail(e.target.value);
                    setError({ ...error, email: "" });
                }} />
            {error.email && <p style={{ color: "red" }}>{error.email}</p>}

            <input type="text" placeholder="Enter phone"
                onChange={(e) => {
                    setPhone(e.target.value);
                    setError({ ...error, phone: "" });
                }} />
            {error.phone && <p style={{ color: "red" }}>{error.phone}</p>}

            <select onChange={(e) => {
                setGender(e.target.value);
                setError({ ...error, gender: "" });
            }}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            {error.gender && <p style={{ color: "red" }}>{error.gender}</p>}

            <input type="password" placeholder="Enter password"
                onChange={(e) => {
                    setPassword(e.target.value);
                    setError({ ...error, password: "" });
                }} />
            {error.password && <p style={{ color: "red" }}>{error.password}</p>}

            <button type="submit">Register</button>
        </form>
    );
}

export default Register;
