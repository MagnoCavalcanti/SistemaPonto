from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session


import os
import sys

absolut_path = os.path.abspath(os.curdir)
sys.path.insert(0, absolut_path)

from backend.schemas.user import User
from backend.database.seed_data import get_db_session
from backend.services.auth_user import UserUseCases

auth_router = APIRouter()

@auth_router.post('/cadastro')
def RegistrarUsuario(user: User, db: Session = Depends(get_db_session)):
    register = UserUseCases(dbsession=db)
    register.register_user(user= user)
    return JSONResponse(
        content={'msg': 'success'},
        status_code=status.HTTP_201_CREATED
    )