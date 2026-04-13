import {
    Anchor,
    Button,
    Group,
} from '@mantine/core'
import { Link } from "react-router";

import { useAuth } from '../auth/AuthProvider'

export default function AuthNav(){
    const { logout, isAuthenticated } = useAuth();

    if (isAuthenticated){
        return <Button onClick={logout}>Log Out</Button>
    }
    else {
        return (
            <Group>
                <Anchor component={Link} to="/auth/Login">Login</Anchor>
                <Anchor component={Link} to="/auth/register">Register</Anchor>
            </Group>
        )
    }
}
