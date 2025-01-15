import pytest
from sqlalchemy.exc import OperationalError

import os
import sys

absolut_path = os.path.abspath(os.curdir)
sys.path.insert(0, absolut_path)

from backend.database.db_connection import engine


def test_connection():
    try:
        with engine.connect() as connection:
            assert connection.closed == False
    except OperationalError:
        pytest.fail("Database connection failed")