import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { account } from '../appwrite/config'; // Make sure this is correctly configured

function Register() {
    const [userName, setUserName] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // State for error messages
    const [loading, setLoading] = useState(false); // State for loading indication

    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userName === "" || email === "" || password === "" || fullName === "" || phone === "") {
            setError("Please enter all required fields");
        } else {
            register();
        }
    };

    const register = async () => {
        setLoading(true); // Set loading to true when starting the registration
        setError(""); // Clear previous errors
        try {
            let person = await account.create('unique()', email, password, userName); // Adjust parameters as needed
            console.log(person);
            navigate('/login'); // Redirect to the login page on successful registration
        } catch (e) {
            setError(e.message || "An error occurred during registration"); // Set error message
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="registration-container">
            <h1>Registration</h1>
            {error && <p className="error">{error}</p>} {/* Display error message */}
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} aria-label="Username" />
                </label>
                <label>
                    Fullname:
                    <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} aria-label="Fullname" />
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email" />
                </label>
                <label>
                    Phone:
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} aria-label="Phone" />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} aria-label="Password" />
                </label>
                <button type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    );
}

export default Register;
