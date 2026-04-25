import {
    Text,
    Title,
} from '@mantine/core'
import { useEffect, useState } from 'react';

import { useApi } from '../lib/api'

export default function Dashboard(){
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
        <Text>Welcome { apiData ? apiData.nickname : loading ? "..." : null}!</Text>
        <Title order={2}>App Data</Title>
        { loading ? "Loading..." : <pre>{JSON.stringify(apiData, null, 2)}</pre> }
        </>
    )
}
