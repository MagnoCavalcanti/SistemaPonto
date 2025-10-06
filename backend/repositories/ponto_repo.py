from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import status, HTTPException
from pydantic import ValidationError


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
        
    def sync_registers(self, registers: list[dict]):
        registers_list: list[Registro_models] = []
        
        try:
            for register in registers:
                register_on_db = Registro_models(**register)

                registers_list.append(register_on_db)
            
            self.db.add_all(registers_list)
            self.db.commit()
        except ValidationError as e:
            print(e)
        except IntegrityError as e:
            self.db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Erro de integridade: {e}"
            )
        except Exception as e:
            self.db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=str(e)
            )