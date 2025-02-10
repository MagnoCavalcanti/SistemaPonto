from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from jose import jwt
from decouple import config

import os
import sys

absolut_path = os.path.abspath(os.curdir)
sys.path.insert(0, absolut_path)

from backend.database.db_connection import Session as sessionmaker
from backend.services.auth_user import UserUseCases

SECRET_KEY = config("SECRET_KEY")
ALGORITHM = config("ALGORITHM")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="http://127.0.0.1:8000/login")  # Define o esquema de autenticação

def get_db_session():
    try:
        session = sessionmaker()
        yield session
    finally:
        session.close()



def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db_session)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        # Decodifica o token
        uc = UserUseCases(dbsession=db)
        payload = uc.verify_token(token)
        
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token expired")
    except jwt.JWTError:
        raise credentials_exception