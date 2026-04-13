// src/auth/AuthProvider.jsx

import { createContext, useContext, useEffect, useState, } from "react";

import { supabase } from '../lib/supabase'

const AuthContext = createContext({})
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(() => {
        // get initial session
        supabase.auth.getUser().then(({ data }) => {
            setUser(data?.user ?? null)
            setLoading(false)
        })

        // listen for changes
        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null)
            }
        )

        return () => {
            listener.subscription.unsubscribe()
        }
    }, [])

    async function register(email, password) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: window.location.origin,
                //emailRedirectTo: `${window.location.origin}/auth/callback`,
            }
        });

        if (error) throw error
        return data
    }

    async function loginWithMagickLink(email) {
        supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: window.location.origin,
                //emailRedirectTo: `${window.location.origin}/auth/callback`,
            }
        });
    }

    async function login(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw error
        return data
    }

    async function logout()  {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        setUser(null);
    };

    const value = {
        user,
        loading,
        register,
        //loginWithMagickLink,
        login,
        logout,
        isAuthenticated: !!user,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
