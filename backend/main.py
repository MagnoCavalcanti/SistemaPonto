from fastapi import FastAPI
from .api.endpoints.auth import auth_router

app = FastAPI()

@app.get('/')
def home():
    return {'status': 'rodando'}

app.include_router(auth_router)