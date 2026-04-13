import {
    Button,
    Title,
} from '@mantine/core'

import { useAuth } from '../auth/AuthProvider'

export default function Dashboard(){
    const { logout, user } = useAuth()

    const handleLogout = async (event) => {
        event.preventDefault();
        await logout();
    }

    return (
        <>
        <Title>Dashboard</Title>
        <Title order={2}>Welcome { user.email }</Title>
        <pre>
            { JSON.stringify(user, null, 2) }
        </pre>
        <Button onClick={ handleLogout } >Sign Out</Button>
        </>
    )
}
