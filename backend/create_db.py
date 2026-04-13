from database import engine, SessionLocal
#from models.dummy import Base, Dummy
from models.user import Base, User

db = SessionLocal()

Base.metadata.create_all(engine)

"""
dummy = Dummy(foo="bar", biz=True)
db.add(dummy)
db.commit()
db.close()
"""
