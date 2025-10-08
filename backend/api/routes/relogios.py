from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

import os
import sys

absolut_path = os.path.abspath(os.curdir)
sys.path.insert(0, absolut_path)

from backend.database.seed_data import get_db_session
from backend.repositories import RelogioRepository
from backend.schemas import Relogio
from backend.services import verificar_empresa




relogios_router = APIRouter(prefix="/{empresa}/relogios")

@relogios_router.get("/")
def listar_relogios(db: Session = Depends(get_db_session), empresa: str = None):
    empresa_id = verificar_empresa(db=db, empresa=empresa)
    relogio_repo = RelogioRepository(db)
    relogios = relogio_repo.listar_relogios(empresa_id=empresa_id)
    
    return {"relogios": relogios}

@relogios_router.post("/cadastrar")
def cadastrar_relogio(db: Session = Depends(get_db_session), empresa: str = None, relogio: Relogio = None):
    empresa_id = verificar_empresa(db=db, empresa=empresa)
    relogio_repo = RelogioRepository(db)
    relogio_repo.registrar_relogio(empresa_id=empresa_id, relogio=relogio)  

    return {"message": "Relógio cadastrado com sucesso!"}

@relogios_router.put("/{relogio_id}/editar/")
def editar_relogio(db: Session = Depends(get_db_session), empresa: str = None, relogio_id: int = None, relogio: Relogio = None):
    empresa_id = verificar_empresa(db=db, empresa=empresa)
    relogio_repo = RelogioRepository(db)
    relogio_repo.atualizar_relogio(empresa_id=empresa_id, relogio_id=relogio_id, relogio=relogio)
    return {"message": "Relógio editado com sucesso!"}



    
    