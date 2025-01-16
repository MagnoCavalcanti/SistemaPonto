from pydantic import BaseModel

class Funcionario(BaseModel):

    nome: str
    matricula: int
    pis: int
    empresa: str
    funcao: str
    grupo: str
    cpf: str
    data: str
