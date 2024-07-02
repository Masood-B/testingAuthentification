import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../appwrite/config";

const MAX_ATTEMPTS = 3;
const TIMER_DURATION = 30; // 30 seconds

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0); // State for login attempts
  const [timer, setTimer] = useState(0); // State for countdown timer
  const navigate = useNavigate();

  const checkSession = useCallback(async () => {
    try {
      await account.getSession("current");
      navigate("/");
    } catch (e) {
      // No session found, user is not logged in
    }
  }, [navigate]);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  // Effect hook to manage the countdown timer and reset attempts
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && attempts >= MAX_ATTEMPTS) {
      setAttempts(0); // Reset attempts after cooldown
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
      console.log('Login successful:', person);
      setAttempts(0); // Reset attempts on successful login
      navigate("/");
    } catch (e) {
      console.error('Login error:', e);
      if (e.message.includes("Invalid credentials")) {
        setError("Invalid email or password. Please check your credentials.");
      } else if (e.message.includes("Rate limit")) {
        setError("Too many login attempts. Please wait and try again.");
        setTimer(TIMER_DURATION);
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
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
