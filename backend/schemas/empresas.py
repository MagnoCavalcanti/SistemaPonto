from pydantic import BaseModel


class Empresa(BaseModel):

    nome: str
    cnpj: str = 'XX.XXX.XXX/XXXX-XX'

    class Config:
        orm_mode = True
