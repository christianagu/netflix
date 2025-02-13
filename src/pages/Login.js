import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/userService";

const Login = () => {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await loginUser(credentials);
            navigate("/"); // Redirect to home after login
        } catch (err) {
            setError("Invalid username or password");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input type="username" name="username" onChange={handleChange} required />

                <label>Password:</label>
                <input type="password" name="password" onChange={handleChange} required />

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
