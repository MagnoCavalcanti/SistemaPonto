from decouple import config

import os
import sys

absolut_path = os.path.abspath(os.curdir)
sys.path.insert(0, absolut_path)

from backend.database.db_connection import Session as sessionmaker


SECRET_KEY = config("SECRET_KEY")
ALGORITHM = config("ALGORITHM")

def get_db_session():
    try:
        session = sessionmaker()
        yield session
    finally:
        session.close()  
