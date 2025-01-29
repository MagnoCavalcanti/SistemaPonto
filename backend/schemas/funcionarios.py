from pydantic import BaseModel

class Funcionario(BaseModel):

    nome: str
    matricula: int
    pis: int
    empresa_id : int
    funcao: str
    grupo: str
    cpf: str
    
