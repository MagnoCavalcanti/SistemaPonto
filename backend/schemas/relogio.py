from pydantic import BaseModel

class Relogio(BaseModel):
    nome: str
    user: str
    senha: str
    ip: str
    porta: int
    empresa_id: int