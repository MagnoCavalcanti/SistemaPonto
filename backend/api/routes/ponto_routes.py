from fastapi import APIRouter, Depends, status, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

import os
import sys

absolut_path = os.path.abspath(os.curdir)
sys.path.insert(0, absolut_path)

from backend.repositories import PontoRepo, RelogioRepository
from backend.database.seed_data import get_db_session
from backend.schemas import RegistroPonto
from .webSocket import manager

ponto_router = APIRouter(prefix="/{empresa}/ponto")

@ponto_router.post("/registro")
def registrar_ponto(ponto: RegistroPonto,db: Session = Depends(get_db_session)):
    ponto_repo = PontoRepo(dbsession=db)
    ponto_repo.Bater_Ponto(ponto)
    return {"msg": "Registro realizado!"}

@ponto_router.post("/{relogio_id}/registros")
async def requisitar_registros(
    empresa: str, 
    relogio_id: int, 
    data_inicio: str = None,
    data_fim: str = None,
    db: Session = Depends(get_db_session)
):
    if not empresa in manager.active_connections:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Conexão com o desktop não realizada! Por favor se conecte com a aplicação desktop."
        )

    relogio_repo = RelogioRepository(db)
    relogio_db = relogio_repo.rep_filter_by_id(relogio_id)
    relogio = {
        "nome": relogio_db.nome,
        "user": relogio_db.user,
        "senha": relogio_db.senha,
        "ip": relogio_db.ip,
        "porta": relogio_db.porta,
        "empresa_id": relogio_db.empresa_id
    }
    
    success = await manager.send_req_for_export_registers(
        empresa= empresa,
        rep= relogio,
        data_inicio= data_inicio,
        data_fim= data_fim
    )

    if not success:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    
    return {
        "status_code":status.HTTP_200_OK,
        "detail": "requisição enviada ao REP!"
    }