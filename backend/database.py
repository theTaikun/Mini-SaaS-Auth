from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import NullPool

from definitions import DATABASE_URL


engine = create_engine(DATABASE_URL, poolclass=NullPool) # NullPool only required if using pooling URI
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
