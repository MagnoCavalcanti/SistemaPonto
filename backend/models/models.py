from sqlalchemy import Column, Integer, String, ForeignKey, Date, Time, DateTime, Enum, CheckConstraint
from sqlalchemy.orm import validates
import re


from .base import Base



class UserModel(Base):

    __tablename__ = 'users'
    id = Column('id',Integer, autoincrement=True, primary_key=True)
    username = Column('username', String, nullable=False, unique=True)
    password = Column('password', String, nullable=False)
    email = Column('email', String, nullable=False, unique=True)


class Funcionario(Base):

    __tablename__ = "funcionarios"
    id = Column(Integer, autoincrement=True, primary_key=True)
    nome= Column(String, nullable=False)
    matricula= Column(Integer, nullable=False, unique=True)
    pis= Column(Integer, nullable=False, unique=True)
    empresa_id = Column(Integer, ForeignKey("empresas.id"))
    funcao= Column(String)
    grupo= Column(String)
    cpf= Column(String, nullable=False, unique=True)  

    @validates('cpf')
    def validate_cpf(self, key, cpf):
        # Regex para validar CPF formatado ou apenas números
        pattern = r"^\d{3}\.\d{3}\.\d{3}-\d{2}$"

        if not re.match(pattern, cpf):
            raise ValueError("CPF inválido. Use o formato XXX.XXX.XXX-XX.")
        
        return cpf
   


class Empresa(Base):

    __tablename__ = "empresas"
    id = Column(Integer, autoincrement=True, primary_key=True)
    nome = Column(String, nullable=False, unique=True)
    cnpj = Column(String, nullable=False, unique=True)

    
    @validates('cnpj')
    def validate_cnpj(self, key, cnpj):
        # Regex para validar CNPJ formatado ou apenas números
            pattern = r"^\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2}$"

            if not re.match(pattern, cnpj):
                raise ValueError("CNPJ inválido. Use o formato XX.XXX.XXX/XXXX-XX.")

            return cnpj
class RegistroPonto(Base):

    __tablename__= "registros_de_pontos"
    id = Column(Integer, autoincrement=True, primary_key=True)
    id_funcionario = Column(Integer, ForeignKey("funcionarios.id"), nullable=False)
    data = Column(Date, nullable=False)
    hora = Column(Time, nullable=False)
    tipo = Column(Enum("Entrada", "Saída", "Início do Intervalo", "Fim do Intervalo"), nullable=False)
    

class Relogio(Base):
    __tablename__ = "relogios"
    id = Column(Integer, autoincrement=True, primary_key=True)
    nome = Column(String, nullable=False, unique=True)
    user = Column(String, nullable=False)
    senha = Column(String, nullable=False)
    ip = Column(String, nullable=False, unique=True)
    porta = Column(Integer, nullable=False)
    empresa_id = Column(Integer, ForeignKey("empresas.id"), nullable=False)

    __table_args__ = (
        CheckConstraint('porta >= 0 AND porta <= 65535', name='porta_range'),
    ) 

    @validates('porta')
    def validate_porta(self, key, value):
        if value < 0 or value > 65535:
            raise ValueError('Porta inválida')
        return value

    
    