// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import {
    MantineProvider,
    AppShell,
    Group,
    Text,
    Title,
} from '@mantine/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import AuthNav from './components/AuthNav'

import RootRedirect from './layouts/RootRedirect'
import AuthLayout from './layouts/AuthLayout'
import ProtectedLayout from './layouts/ProtectedLayout'

import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

export default function App() {
  return (
      <>
        <BrowserRouter>
        <MantineProvider>
            <AppShell
                header={{ height: 60 }}
                padding="md"
            >
                <AppShell.Header>
                    <Group justify="space-between">
                        <Text>Mini SaaS Auth</Text>
                        <AuthNav />
                    </Group>
                </AppShell.Header>
                <AppShell.Main>
                    <Routes>
                        <Route path="/" element={<RootRedirect />}  />

                        <Route path="/auth" element={<AuthLayout />} >
                            <Route path="login" element={<Login />} />
                            <Route path="register" element={<Register />} />
                        </Route>

                        <Route element={<ProtectedLayout />} >
                            <Route path="/dashboard" element={<Dashboard />} />
                        </Route>
                    </Routes>
                </AppShell.Main>
            </AppShell>
        </MantineProvider>
        </BrowserRouter>
      </>
  )
}
