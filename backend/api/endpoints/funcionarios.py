from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

import os
import sys

absolut_path = os.path.abspath(os.curdir)
sys.path.insert(0, absolut_path)

from backend.services.funcionario_repo import FuncionarioRepo
from backend.database.seed_data import get_db_session
from backend.schemas import Funcionario

funcio_router = APIRouter(prefix="/funcionarios")

@funcio_router.get("/")
def teste():
    return {"msg": "rodando"}

@funcio_router.post("/cadastro")
def cadastro_funcionario(
    funcionario: Funcionario, 
    db : Session = Depends(get_db_session)
    ):
    funcio_repo = FuncionarioRepo(dbsession=db)
    funcio_repo.register_funcionario(funcionario=funcionario)

    return JSONResponse(
        content={"msg": "sucess"},
        status_code=status.HTTP_201_CREATED
    )