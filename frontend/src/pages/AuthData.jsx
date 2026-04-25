import {
    Text,
    Title,
} from '@mantine/core'

import { useAuth } from '../auth/AuthProvider'

export default function Dashboard(){
    const { user } = useAuth()

    return (
        <>
        <Title>Dashboard</Title>
        <Text>Welcome { user.email }!</Text>
        <Title order={2}>Auth Data</Title>
        <pre>
            { JSON.stringify(user, null, 2) }
        </pre>
        </>
    )
}
