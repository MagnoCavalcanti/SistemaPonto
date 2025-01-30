from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api import auth_router, empresa_router, funcio_router, ponto_router

origins = "http://localhost:5173"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origins],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def home():
    return {'status': 'rodando'}

app.include_router(auth_router)
app.include_router(funcio_router)
app.include_router(empresa_router)
app.include_router(ponto_router)