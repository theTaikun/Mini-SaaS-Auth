from database import engine, SessionLocal
from models.user import Base

db = SessionLocal()

Base.metadata.create_all(engine)
