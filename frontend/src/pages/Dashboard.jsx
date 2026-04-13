import {
    Button,
    Title,
} from '@mantine/core'
import { useEffect, useState } from 'react';

import { useAuth } from '../auth/AuthProvider'

export default function Dashboard(){
    const { getAccessToken, user } = useAuth()
    const [ accessToken, setAccessToken ] = useState("")

    useEffect(() => {
        const fetchToken = async () => {
            const token = await getAccessToken()
            setAccessToken(token)
        }
        fetchToken();
    }, [])

    return (
        <>
        <Title>Dashboard</Title>
        <Title order={2}>Welcome { user.email }</Title>
        <Title order={3}>Access Token</Title>
        { accessToken }
        <Title order={3}>User Data</Title>
        <pre>
            { JSON.stringify(user, null, 2) }
        </pre>
        </>
    )
}
