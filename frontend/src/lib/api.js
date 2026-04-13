// src/lib/api.js
import { useAuth } from '../auth/AuthProvider'

const API_URL = import.meta.env.VITE_API_URL


export function useApi() {
    const { getAccessToken } = useAuth()

    async function apiFetch(path, options = {}) {
        const token = await getAccessToken()

        const response = await fetch(`${API_URL}${path}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                ...options.headers,
            },
        })

        if (!response.ok) {
            const error = await response.json().catch(() => ({}))
            throw new Error(error.message || `API error ${response.status}`)
        }

        return response.json()
    }

    // Convenience wrappers
    return {
        get: (path) => apiFetch(path),
        post: (path, body) => apiFetch(path, { method: 'POST', body: JSON.stringify(body) }),
        put: (path, body) => apiFetch(path, { method: 'PUT', body: JSON.stringify(body) }),
        delete: (path) => apiFetch(path, { method: 'DELETE' }),
    }
}
