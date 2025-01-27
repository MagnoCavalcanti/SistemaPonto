from pydantic import BaseModel

class Funcionario(BaseModel):

    nome: str
    matricula: int
    pis: int
    nome_empresa: str
    empresa_id : int
    funcao: str
    grupo: str
    cpf: str
    
