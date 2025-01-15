from sqlalchemy import Column, Integer, String



from .base import Base

class UserModel(Base):

    __tablename__ = 'users'
    id = Column('id',Integer, autoincrement=True, primary_key=True)
    username = Column('username', String(50), nullable=False, unique=True)
    password = Column('password', String(50), nullable=False)
    email = Column('email', String(50), nullable=False, unique=True)