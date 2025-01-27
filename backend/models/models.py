from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship


from .base import Base

class UserModel(Base):

    __tablename__ = 'users'
    id = Column('id',Integer, autoincrement=True, primary_key=True)
    username = Column('username', String(50), nullable=False, unique=True)
    password = Column('password', String(300), nullable=False)
    email = Column('email', String(50), nullable=False, unique=True)


class Funcionario(Base):

    __tablename__ = "funcionarios"
    id = Column(Integer, autoincrement=True, primary_key=True)
    nome= Column(String(75), nullable=False)
    matricula= Column(Integer, nullable=False, unique=True)
    pis= Column(Integer, nullable=False, unique=True)
    empresa_id = Column(Integer, ForeignKey("empresas.id"))
    funcao= Column(String(100))
    grupo= Column(String(100))
    cpf= Column(String(20), nullable=False, unique=True)

   


class Empresa(Base):

    __tablename__ = "empresas"
    id = Column(Integer, autoincrement=True, primary_key=True)
    nome = Column(String(100), nullable=False, unique=True)
    cnpj = Column(String(25), nullable=False, unique=True)

    