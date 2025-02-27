from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import status, HTTPException


import os
import sys

absolut_path = os.path.abspath(os.curdir)
sys.path.insert(0, absolut_path)

from backend.schemas import Empresa
from backend.models import Empresa as Empresa_models

class EmpresaRepositorio:

    def __init__(self, db_session: Session):

        self.db = db_session


    def register_empresa(self, empresa: Empresa):
        if empresa.cnpj == 'XX.XXX.XXX/XXXX-XX':
            empresa.cnpj = None # Não pode ser None
        empresa_model = Empresa_models(
            nome=empresa.nome,
            cnpj=empresa.cnpj
        )
        
        try:
            self.db.add(empresa_model)
            self.db.commit()
        except IntegrityError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail='Empresa já existente!'
            )

    def read_empresa(self):
        empresa_db = self.db.query(Empresa_models).all()

        return empresa_db

    def update_empresa(self, id_empresa: int, value_update):
        try:
            self.db.query(Empresa_models).filter_by(id=id_empresa).update(value_update)
            self.db.commit()
        except IntegrityError:
            self.db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Falha na atualização! Verifique se os dados são válidos."
            )
        except Exception as e:
            self.db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro interno: {e}"
            )
    
    def search_empresa(self, empresa_nome: int):
        try:
            empresa_db = self.db.query(Empresa_models).filter_by(nome=empresa_nome).first()
            return empresa_db
        except Exception as e:
            self.db.rollback()
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Erro interno: {e}"
            )
