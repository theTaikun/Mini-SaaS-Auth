"""
Required definitions for project-wide config and variables
These settings should not need to be changed often
For environment specific configs and secrets see .env
For tunables, specific page configs, and misc, see project-config.ini
"""

from configparser import ConfigParser
import os

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))

ENV_CONF_FILE = os.path.join(ROOT_DIR, ".env")
ENVIRONMENT = os.getenv("ENVIRONMENT") or "production"

config = ConfigParser()
config.read(ENV_CONF_FILE)

DATABASE_URL = config.get("DATABASE", "DATABASE_URL")

SUPABASE_URL = config.get("SUPABASE", "SUPABASE_URL")
SUPABASE_ANON_KEY = config.get("SUPABASE", "SUPABASE_ANON_KEY")

