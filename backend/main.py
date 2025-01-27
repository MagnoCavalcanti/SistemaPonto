from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api.endpoints.auth import auth_router
from .api.endpoints.empresas import empresa_router

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
app.include_router(empresa_router)