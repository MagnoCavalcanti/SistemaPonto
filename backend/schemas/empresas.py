from pydantic import BaseModel


class Empresa(BaseModel):

    nome: str
    cnpj: str