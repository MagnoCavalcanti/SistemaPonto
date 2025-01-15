from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import status, HTTPException

import os
import sys

absolut_path = os.path.abspath(os.curdir)
sys.path.insert(0, absolut_path)

from backend.schemas.user import User
from backend.models.user import UserModel

class UserUseCases:

    def __init__(self, dbsession: Session):
        
        self.dbsession = dbsession #Recebe a Session da conexão do banco de dados 
        
    

    def register_user(self, user: User):
        user_model = UserModel(
            username= user.username,
            password= user.password,
            email= user.email 
        )
        try:
            self.dbsession.add(user_model)
            self.dbsession.commit()
        except IntegrityError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail='Usuário já existente!'
            )
        
    

            
