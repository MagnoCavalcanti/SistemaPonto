from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm


import os
import sys

absolut_path = os.path.abspath(os.curdir)
sys.path.insert(0, absolut_path)

from backend.schemas.user import User
from backend.database.seed_data import get_db_session, get_current_user
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

@auth_router.post("/login")
def LoginUsuario(
    request_form_user: OAuth2PasswordRequestForm = Depends(), 
    db: Session = Depends(get_db_session)
    ):
    
    login = UserUseCases(dbsession=db)
    user = User(
        username=request_form_user.username,
        password=request_form_user.password,
    )

    data_auth = login.login_user(user=user)

    return JSONResponse(
        content=data_auth,
        status_code=status.HTTP_200_OK
    )

@auth_router.get("/protected-route")
def protected_route(current_user: dict = Depends(get_current_user)):
    return {"message": "You are authenticated", "user": current_user}
    

    
        