from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

import os
import sys

absolut_path = os.path.abspath(os.curdir)
sys.path.insert(0, absolut_path)

from backend.repositories.funcionario_repo import FuncionarioRepo
from backend.repositories.empresa_repo import EmpresaRepositorio
from backend.database.seed_data import get_db_session, verificar_empresa
from backend.schemas import Funcionario

funcio_router = APIRouter(prefix="/{empresa}/funcionarios")



@funcio_router.get("/")
def listar_funcionarios(db:Session = Depends(get_db_session), empresa: str = None):
    empresa_id = verificar_empresa(empresa, db)
    funcio_repo = FuncionarioRepo(dbsession=db)
    funcionarios = funcio_repo.list_funcionario(empresa_id=empresa_id)

    return funcionarios

@funcio_router.post("/cadastro")
def cadastro_funcionario(
    funcionario: Funcionario, 
    db : Session = Depends(get_db_session),
    empresa: str = None
    ):
    empresa_id = verificar_empresa(empresa, db)
    funcio_repo = FuncionarioRepo(dbsession=db)
    funcio_repo.register_funcionario(funcionario=funcionario, empresa_id=empresa_id)

    return JSONResponse(
        content={"msg": "sucess"},
        status_code=status.HTTP_201_CREATED
    )

@funcio_router.put("/{id}/atualizar/")
def atualizar_funcionários(id:int, funcionario_update: Funcionario ,db:Session = Depends(get_db_session), empresa: str = None):
    funcionario_repo = FuncionarioRepo(dbsession=db)
    print(verificar_empresa(empresa=empresa, db=db))
    funcionario_repo.update_funcionario(
        id_funcionario=id,
        value_update= funcionario_update.__dict__,
        empresa_id=verificar_empresa(empresa=empresa, db=db)
    )

    return JSONResponse(
        content={'msg': 'success'},
        status_code=status.HTTP_202_ACCEPTED
    )