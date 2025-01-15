import os
import sys

absolut_path = os.path.abspath(os.curdir)
sys.path.insert(0, absolut_path)

from backend.database.db_connection import Session

def get_db_session():
    try:
        session = Session()
        yield session
    finally:
        session.close()
