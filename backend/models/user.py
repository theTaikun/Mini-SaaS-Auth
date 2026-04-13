# models/user.py
from sqlalchemy import Column, String, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "USERS"

    id = Column(String, primary_key=True)
    email = Column(String, nullable=False, index=True)
    auth_provider = Column(String, nullable=False)
    provider_user_id = Column(String, unique=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # App-only info not in auth provider:
    nickname = Column(String, nullable=False, default="theTaikun")

