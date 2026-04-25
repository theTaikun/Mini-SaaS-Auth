# Mini-SaaS-Auth Frontend


## Installation

```bash
npm install
```


## Configuration

Copy the `.env.example` to `.env.local`,
and edit it add your
Supabase URL,
publishable or anon key,
and the URL of your backend API.

The API URL must be reachable from your client,
that is, the browser you'll actually be using.
For instance,
if you are running the API on a server,
this frontend on a separate desktop,
and accessing the web app from a mobile device,
`VITE_API_URL` should be an address that the mobile device can reach.
`localhost` won't work in this instance,
because your mobile device will try to contact itself.
`localhost` will only work if you are using the web browser of the API system,
or have some sort of proxying configured.

Similarly,
`VITE_PUBLIC_URL`
should be set to an address which is accessible by your brower
to reach this web app.


### Supabase

Ensure the URL of your site is listed in `Authentication` -> `URL Configuration`.
This will be the callback location after confirming signup via email,
so your client must be reachable at this location.
Supabase defaults to `http://localhost:3000`,
so if you access the web app from your browser using this address,
by default.
Most likely,
it will be the same as what you configured for
`VITE_PUBLIC_URL`.


## Running

```bash
npm run dev
```
