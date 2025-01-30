from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

import os
import sys

absolut_path = os.path.abspath(os.curdir)
sys.path.insert(0, absolut_path)

from backend.services.ponto_repo import PontoRepo
from backend.database.seed_data import get_db_session
from backend.schemas import RegistroPonto

ponto_router = APIRouter(prefix="/ponto")

@ponto_router.post("/registro")
def registrar_ponto(ponto: RegistroPonto,db: Session = Depends(get_db_session)):
    ponto_repo = PontoRepo(dbsession=db)
    ponto_repo.Bater_Ponto(ponto)
    return {"msg": "Registro realizado!"}