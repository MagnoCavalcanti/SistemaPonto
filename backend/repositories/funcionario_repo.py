from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import status, HTTPException

import os
import sys

absolut_path = os.path.abspath(os.curdir)
sys.path.insert(0, absolut_path)

from backend.schemas import Funcionario
from backend.models import Funcionario as Funcionario_models

class FuncionarioRepo:

    def __init__(self, dbsession: Session):
        self.db = dbsession

    
    def register_funcionario(self, funcionario:Funcionario, empresa_id: int):
        if funcionario.cpf == 'XXX.XXX.XXX-XX':
            funcionario.cpf = None # Não pode ser None
            
        funcionario_model = Funcionario_models(
            nome=funcionario.nome,
            matricula=funcionario.matricula,
            pis=funcionario.pis,
            empresa_id= empresa_id,
            funcao=funcionario.funcao,
            grupo=funcionario.grupo,
            cpf=funcionario.cpf
        )
        if funcionario.empresa_id != empresa_id:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Empresa não encontrada!"
            )
        
        try:
            self.db.add(funcionario_model)
            self.db.commit()
        except IntegrityError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail='Funcionário já existente!'
            )
    def list_funcionario(self, empresa_id: int):
        try:
            funcionario_db = self.db.query(Funcionario_models).filter_by(empresa_id=empresa_id).all()
            
            return funcionario_db
        except IntegrityError:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Erro no servidor!"
            )
        
    def update_funcionario(self, id_funcionario: int, value_update, empresa_id: int):
        try:
            updated = self.db.query(Funcionario_models).filter(Funcionario_models.id ==id_funcionario, Funcionario_models.empresa_id == empresa_id).update(value_update)
            self.db.commit()
            if updated == 0:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Funcionário não encontrado!"
                )
            
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