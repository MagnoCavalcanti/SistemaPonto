from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

import os
import sys

absolut_path = os.path.abspath(os.curdir)
sys.path.insert(0, absolut_path)

from backend.database.seed_data import get_db_session, verificar_empresa
from backend.repositories.relogio_repo import RelogioRepository
from backend.schemas.relogio import Relogio
from backend.api.routes.webSocket import manager



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

@relogios_router.post("/{relogio_id}/registros")
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

    
    