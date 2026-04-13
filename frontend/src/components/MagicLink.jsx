// src/components/MagicLink.jsx

import { useState, } from "react";

import { useAuth } from '../auth/AuthProvider'


export default function MagicLink() {
    const { authError, authSuccess, claims, handleLogin, handleLogout, setAuthError, verifying } = useAuth()
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const { error } = await handleLogin(email);
        if (error) {
            setMessage(error.error_description || error.message)
        } else {
            setMessage("Check your email for the login link!");
        }
        setLoading(false);
    };

    // Show verification state
    if (verifying) {
        return (
            <div>
                <h1>Authentication</h1>
                <p>Confirming your magic link...</p>
                <p>Loading...</p>
            </div>
        );
    }

    // Show auth error
    if (authError) {
        return (
            <div>
                <h1>Authentication</h1>
                <p>✗ Authentication failed</p>
                <p>{authError}</p>
                <button
                    onClick={() => {
                        setAuthError(null);
                        window.history.replaceState({}, document.title, "/");
                    }}
                >
                    Return to login
                </button>
            </div>
        );
    }

    // Show auth success (briefly before claims load)
    if (authSuccess && !claims) {
        return (
            <div>
                <h1>Authentication</h1>
                <p>✓ Authentication successful!</p>
                <p>Loading your account...</p>
            </div>
        );
    }

    // If user is logged in, show welcome screen
    if (claims) {
        return (
            <div>
                <h1>Welcome!</h1>
                <p>You are logged in as: {claims.email}</p>
                <button onClick={handleLogout}>
                    Sign Out
                </button>
                <pre>{JSON.stringify(claims,null,2)}</pre>
            </div>
        );
    }

    // Show login form
    return (
        <div>
            <h1>Supabase + React</h1>
            <p>Sign in via magic link with your email below</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button disabled={loading}>
                    {loading ? <span>Loading</span> : <span>Send magic link</span>}
                </button>
            </form>
            { message }
        </div>
    );
}
