from pydantic import BaseModel


class Empresa(BaseModel):

    nome: str
    cnpj: str

    class Config:
        orm_mode = True
