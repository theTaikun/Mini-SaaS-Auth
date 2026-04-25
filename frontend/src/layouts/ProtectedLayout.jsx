import { Link, Navigate, Outlet } from "react-router-dom";
import {
    Anchor,
    AppShell,
    Group,
    Text,
} from '@mantine/core';

import { useAuth } from "../auth/AuthProvider";
import AuthNav from '../components/AuthNav'

export default function ProtectedLayout() {
      const { isAuthenticated, loading } = useAuth();

      if (loading) return null;

      if (!isAuthenticated) {
              return <Navigate to="/auth/login" replace />;
            }

      return (
          <AppShell
              header={{ height: 60 }}
              footer={{ height: 60 }}
              padding="md"
          >
              <AppShell.Header>
                  <Group justify="space-between">
                      <Text>Mini SaaS Auth</Text>
                      <AuthNav />
                  </Group>
              </AppShell.Header>
              <AppShell.Main>
                  <Outlet />
              </AppShell.Main>
              <AppShell.Footer>
                  <Group justify="center">
                      <Anchor component={Link} to="/dashboard/authdata">Auth Data</Anchor>
                      <Anchor component={Link} to="/dashboard/appdata">App Data</Anchor>
                  </Group>
              </AppShell.Footer>
          </AppShell>
        );
}
