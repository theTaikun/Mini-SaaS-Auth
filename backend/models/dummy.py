from sqlalchemy import Column, Boolean, Integer, String
from sqlalchemy.orm import  declarative_base

Base = declarative_base()


class Dummy(Base):
    __tablename__ = "DUMMY"

    id = Column(Integer, primary_key=True, index=True)
    foo = Column(String, nullable=True, default="bar")
    biz = Column(Boolean, nullable=True)

