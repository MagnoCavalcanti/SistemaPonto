from decouple import config
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


DB_URl = config('DB_URL')

engine = create_engine(DB_URl, pool_pre_ping=True)
Session = sessionmaker(autocommit=False, autoflush=False, bind=engine)