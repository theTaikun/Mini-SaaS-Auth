import {
    Button,
    Title,
} from '@mantine/core'
import { useEffect, useState } from 'react';

import { useAuth } from '../auth/AuthProvider'
import { useApi } from '../lib/api'

export default function Dashboard(){
    const { user } = useAuth()
    const api = useApi();
    const [ apiData, setApiData ] = useState(null)

    useEffect(() => {
        const fetchData= async () => {
            const data = await api.get("/me")
            setApiData(data)
        }
        fetchData();
    }, [])

    return (
        <>
        <Title>Dashboard</Title>
        <Title order={2}>Welcome { user.email }</Title>
        <Title order={3}>API Response</Title>
        { JSON.stringify(apiData) }
        <Title order={3}>User Data</Title>
        <pre>
            { JSON.stringify(user, null, 2) }
        </pre>
        </>
    )
}
