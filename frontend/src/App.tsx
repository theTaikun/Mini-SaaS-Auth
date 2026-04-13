// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import {
    MantineProvider,
    AppShell,
    Title,
} from '@mantine/core';
import MagicLink from './components/MagicLink'

export default function App() {
  return (
      <>
        <MantineProvider>
            <AppShell
                header={{ height: 60 }}
                padding="md"
            >
                <AppShell.Header>
                    <Title>Mini SaaS Auth</Title>
                </AppShell.Header>
                <AppShell.Main>
                    < MagicLink />
                </AppShell.Main>
            </AppShell>
        </MantineProvider>;
      </>
  )
}
