// src/components/Register.jsx

import {
    Anchor,
    Button,
    TextInput,
    Title
} from "@mantine/core";
import { useState, } from "react";
import { Link } from "react-router";

import { useAuth } from '../auth/AuthProvider'


export default function Login() {
    const { login } = useAuth()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setMessage("");
        try {
            await login(email, password);
        }
        catch (error){
            setMessage(error.error_description || error.message);
        }
        finally {
            setLoading(false);
        }
    };

    // Show login form
    return (
        <div>
            <Title>Login</Title>
            <p>Sign in via email and password below</p>
            <form onSubmit={handleSubmit}>
                <TextInput
                    type="email"
                    placeholder="Your email"
                    value={email}
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextInput
                    type="password"
                    placeholder="Your Password"
                    value={password}
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" disabled={loading}>
                    {loading ? <span>Loading</span> : <span>Submit</span>}
                </Button>
            </form>
            { message }
        <Anchor component={Link} to="/auth/register">Register</Anchor>
        </div>
    );
}
