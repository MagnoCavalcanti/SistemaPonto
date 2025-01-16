from sqlalchemy import Column, Integer, String, Boolean, Date

from .base import Base

class Funcionario(Base):

    __tablename__ = "funcionarios"
    id = Column(Integer, autoincrement=True, primary_key=True)
    nome= Column(String(75), nullable=False)
    matricula= Column(Integer, nullable=False, unique=True)
    pis= Column(Integer, nullable=False, unique=True)
    empresa= Column(String(100))
    funcao= Column(String(100))
    grupo= Column(String(100))
    cpf= Column(String(20), nullable=False, unique=True)
    data_adm= Column(Date, nullable=False)