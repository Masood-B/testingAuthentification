import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../appwrite/config";

const MAX_ATTEMPTS = 3;
const TIMER_DURATION = 30; // 30 seconds

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // State for error messages
    const [loading, setLoading] = useState(false); // State for loading indication
    const [attempts, setAttempts] = useState(0); // State for login attempts
    const [timer, setTimer] = useState(0); // State for countdown timer
    const navigate = useNavigate();

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (timer === 0 && attempts >= MAX_ATTEMPTS) {
            setAttempts(0);
        }
        return () => clearInterval(interval);
    }, [timer, attempts]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === "" || password === "") {
            setError("Please enter both email and password");
        } else {
            login();
        }
    };

    const login = async () => {
        setLoading(true);
        setError("");
        try {
            let person = await account.createEmailPasswordSession(email, password);
            console.log(person);
            navigate("/Dashboard");
        } catch (e) {
            setError("Email or password is incorrect");
            setAttempts((prevAttempts) => prevAttempts + 1);
            if (attempts + 1 >= MAX_ATTEMPTS) {
                setTimer(TIMER_DURATION);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = () => {
        navigate("/Register");
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            {error && <p className="error">{error}</p>}
            {timer > 0 && <p className="error">Too many attempts. Please wait {timer} seconds.</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-label="Email"
                        disabled={timer > 0}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        aria-label="Password"
                        disabled={timer > 0}
                    />
                </label>
                <button type="submit" disabled={loading || timer > 0}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
            <button onClick={handleRegister} disabled={timer > 0}>
                Register
            </button>
        </div>
    );
}

export default Login;
