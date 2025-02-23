from pydantic import BaseModel

class Relogio(BaseModel):
    nome: str
    ip: str
    porta: int
    empresa_id: int