# models/user.py
from sqlalchemy import Column, DateTime, String, UniqueConstraint
from sqlalchemy.sql import func
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "USERS"

    id = Column(String, primary_key=True)
    email = Column(String, nullable=False, index=True)
    auth_provider = Column(String, nullable=False)
    auth_provider_uid = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # App-only info not in auth provider:
    nickname = Column(String, nullable=False, default="theTaikun")

    UniqueConstraint('auth_provider', 'auth_provider_uid', name='USER_AK01')
