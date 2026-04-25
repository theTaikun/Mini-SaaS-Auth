// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import {
    MantineProvider,
} from '@mantine/core';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import RootRedirect from './layouts/RootRedirect'
import AuthLayout from './layouts/AuthLayout'
import ProtectedLayout from './layouts/ProtectedLayout'

import Login from './pages/Login'
import Register from './pages/Register'

import AppData from './pages/AppData'
import AuthData from './pages/AuthData'


export default function App() {
  return (
      <>
        <BrowserRouter>
        <MantineProvider>
            <Routes>
                <Route path="/" element={<RootRedirect />}  />

                <Route path="/auth" element={<AuthLayout />} >
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>

                <Route element={<ProtectedLayout />} >
                    <Route path="/dashboard" element={<Navigate to="authdata" replace />} />
                    <Route path="/dashboard/appdata" element={<AppData />} />
                    <Route path="/dashboard/authdata" element={<AuthData />} />
                </Route>
            </Routes>
        </MantineProvider>
        </BrowserRouter>
      </>
  )
}
