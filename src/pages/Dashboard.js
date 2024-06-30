import React, { useEffect, useState, useCallback } from "react";
import { account } from "../appwrite/config";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");

    const isLogin = useCallback(async () => {
        try {
            let person = await account.get("current");
            setEmail(person.email);
            setName(person.name);
            console.log(person);
        } catch (e) {
            navigate("/login");
        }
    }, [navigate]);

    useEffect(() => {
        isLogin();
    }, [isLogin]);

    const logout = async () => {
        try {
            await account.deleteSession("current");
            navigate("/login");
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="dashboard-container">
            {email && name ? (
                <>
                    <h1>Welcome: {name}</h1>
                    <p>Email: {email}</p>
                    <button onClick={logout}>Logout</button>
                </>
            ) : (
                <h1>Loading....</h1>
            )}
        </div>
    );
}

export default Dashboard;
