// src/components/MagicLink.jsx

import {
    Button,
    TextInput,
    Title
} from "@mantine/core";
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
                <Title>Authentication</Title>
                <p>Confirming your magic link...</p>
                <p>Loading...</p>
            </div>
        );
    }

    // Show auth error
    if (authError) {
        return (
            <div>
                <Title>Authentication</Title>
                <p>✗ Authentication failed</p>
                <p>{authError}</p>
                <Button
                    onClick={() => {
                        setAuthError(null);
                        window.history.replaceState({}, document.title, "/");
                    }}
                >
                    Return to login
                </Button>
            </div>
        );
    }

    // Show auth success (briefly before claims load)
    if (authSuccess && !claims) {
        return (
            <div>
                <Title>Authentication</Title>
                <p>✓ Authentication successful!</p>
                <p>Loading your account...</p>
            </div>
        );
    }

    // If user is logged in, show welcome screen
    if (claims) {
        return (
            <div>
                <Title>Welcome!</Title>
                <p>You are logged in as: {claims.email}</p>
                <Button onClick={handleLogout}>
                    Sign Out
                </Button>
                <pre>{JSON.stringify(claims,null,2)}</pre>
            </div>
        );
    }

    // Show login form
    return (
        <div>
            <Title>Supabase + React</Title>
            <p>Sign in via magic link with your email below</p>
            <form onSubmit={handleSubmit}>
                <TextInput
                    type="email"
                    placeholder="Your email"
                    value={email}
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button disabled={loading}>
                    {loading ? <span>Loading</span> : <span>Send magic link</span>}
                </Button>
            </form>
            { message }
        </div>
    );
}
