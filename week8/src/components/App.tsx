import { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import SearchComponent from "./SearchComponent";

export default function App() {
    const [username, setUsername] = useState<string | null>(null);

    // 🔁 Check login on page load
    useEffect(() => {
        async function checkLogin() {
            const response = await fetch("/login");
            const data = await response.json();
            setUsername(data.username); // null or real username
        }

        checkLogin();
    }, []);

    // 🔐 Handle login
    async function handleLogin(username: string, password: string) {
        const response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        if (response.status === 200) {
            setUsername(username);
        } else {
            alert("Login failed");
            setUsername(null);
        }
    }

    // 🔓 Handle logout
    async function handleLogout() {
        await fetch("/logout");
        setUsername(null);
    }

    return (
        <div>
            {username === null ? (
                <LoginForm onLogin={handleLogin} />
            ) : (
                <div>
                    <p>Logged in as {username}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
            <SearchComponent username={username} />
        </div>
    );
}