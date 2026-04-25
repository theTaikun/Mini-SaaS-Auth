import {
    Button,
    Text,
    Title,
} from '@mantine/core'
import { useEffect, useState } from 'react';

import { useAuth } from '../auth/AuthProvider'
import { useApi } from '../lib/api'

export default function Dashboard(){
    const { user } = useAuth()
    const api = useApi();
    const [ apiData, setApiData ] = useState(null)
    const [ loading, setLoading ] = useState(false)

    useEffect(() => {
        const fetchData= async () => {
            setLoading(true)
            const data = await api.get("/me")
            setApiData(data)
            setLoading(false)
        }
        fetchData();
    }, [])

    return (
        <>
        <Title>Dashboard</Title>
        <Text>Welcome { user.email }!</Text>
        <Title order={3}>App Data</Title>
        { loading ? "Loading..." : JSON.stringify(apiData) }
        <Title order={3}>Auth Data</Title>
        <pre>
            { JSON.stringify(user, null, 2) }
        </pre>
        </>
    )
}
