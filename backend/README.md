# Mini-SaaS-Auth Backend

## Overview

The backend consists of an API and a database.
The frontend is expected to make all requests with an access token,
which the backend will verify with Supabase,
in order to authenticate access.

The service is designed to be as portable as possible,
allowing the database to be located on Supabase,
in a local sqlite file,
or any other database supported by SQLAlchemy.

Because of the loose integration with Supabase,
it is the responsibility of this backend to handle certain functions,
such as organization membership,
handling of user roles,
and storing certain information,
such as marrying the internal user id,
with Supabase's id.

This should allow easier migration to another auth provider in the future,
such as if moving to on-prem authentication,
or switching to a service with better pricing.
Supabase allows exporting of all users,
as well as the encryption key used,
so it should be fully possible to migrate to another platform.
If a migration is performed,
it is important to maintain a platform-agnostic authentication architecture,
to allow future unforseen additional migrations.


## Installation

Create the virtual environment,
and install the requirements.

```bash
python -m venv .venv
.venv/bin/pip install -r requirements.txt
```

## Configuration

Copy the example configuration file to `.env`,
and edit as needed,
providing your database url and Supabase information.
Note that your database could also be hosted on Supabase
if the correct URL is provided.

```bash
cp .env.example .env
```


## Starting the API

```bash
.venv/bin/fastapi dev app.py
```

Use the `--host` directive to change the address the API binds to,
if accessing from something other than localhost.


## Development

In addition to the standard requirements,
also install the dev requirements in order to run tests.

```bash
.venv/bin/pip install -r requirements-dev.txt
```

Then tests can be run with

```bash
.venv/bin/pytest
```
