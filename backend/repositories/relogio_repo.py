from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import status, HTTPException

import os   
import sys
absolut_path = os.path.abspath(os.curdir)
sys.path.insert(0, absolut_path)

from backend.models.models import Relogio as RelogioModels
from backend.schemas.relogio import Relogio

class RelogioRepository:
    def __init__(self, dbsession: Session):
        self.db = dbsession


    def listar_relogios(self, empresa_id: int):
        try:
            relogios_db = self.db.query(RelogioModels).filter_by(empresa_id= empresa_id).all()
            return relogios_db
        except Exception as e:
            self.db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Erro no servidor!"
            )
        
    def registrar_relogio(self, relogio: Relogio, empresa_id: int):
        if relogio.empresa_id != empresa_id:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Empresa não encontrada!"
            )
        relogio_models = RelogioModels(
            nome=relogio.nome,
            ip=relogio.ip,
            porta=relogio.porta,
            empresa_id=relogio.empresa_id
        )
        try:
            self.db.add(relogio_models)
            self.db.commit()
        except IntegrityError as e:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Erro ao registrar relogio!"
            )
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Erro no servidor!"
            )