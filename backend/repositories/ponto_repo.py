from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import status, HTTPException


import os
import sys

absolut_path = os.path.abspath(os.curdir)
sys.path.insert(0, absolut_path)

from backend.schemas import RegistroPonto
from backend.models import RegistroPonto as Registro_models

class PontoRepo:

    def __init__(self, dbsession: Session):
        self.db = dbsession

    def Bater_Ponto(self, ponto: RegistroPonto):
        ponto_model = Registro_models(
            id_funcionario=ponto.funcionario_id,
            data=ponto.data,
            hora=ponto.hora,
            tipo=ponto.tipo
        )

        try:
            self.db.add(ponto_model)
            self.db.commit()
        except IntegrityError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail='Dados inválidos!'
            )