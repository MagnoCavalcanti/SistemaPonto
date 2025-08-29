from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import status, HTTPException

import os   
import sys
absolut_path = os.path.abspath(os.curdir)
sys.path.insert(0, absolut_path)

from backend.models.models import Relogio as RelogioModels
from backend.schemas import Relogio   

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
            user=relogio.user,
            senha=relogio.senha,
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
        
    def atualizar_relogio(self, relogio: Relogio,relogio_id: int, empresa_id: int):
        if relogio.empresa_id != empresa_id:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Empresa não encontrada!"
            )
        relogio_db = self.db.query(RelogioModels).filter_by(id=relogio_id).first()
        if not relogio_db:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Relogio não encontrado!"
            )
        relogio_db.nome = relogio.nome
        relogio_db.user = relogio.user
        relogio_db.senha = relogio.senha
        relogio_db.ip = relogio.ip
        relogio_db.porta = relogio.porta
        relogio_db.empresa_id = relogio.empresa_id
        try:
            self.db.commit()
        except IntegrityError as e:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Erro ao atualizar relogio!"
            )
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Erro no servidor!"
            )
    
    def rep_filter_by_id(self, id: int):
        try:
            relogio_db = self.db.query(RelogioModels).filter_by(id=id).first()
            return relogio_db
        except IntegrityError as e:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Erro ao buscar REP: {e}"
            )
        

        