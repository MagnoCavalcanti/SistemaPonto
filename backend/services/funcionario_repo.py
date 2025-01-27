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

    
    def register_funcionario(self, funcionario:Funcionario):
        empresa_model = Funcionario_models(
            nome=funcionario.nome,
            matricula=funcionario.matricula,
            pis=funcionario.pis,
            empresa_id=funcionario.empresa_id,
            funcao=funcionario.funcao,
            grupo=funcionario.grupo,
            cpf=funcionario.cpf
        )
        
        try:
            self.db.add(Funcionario_models)
            self.db.commit()
        except IntegrityError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail='Empresa já existente!'
            )