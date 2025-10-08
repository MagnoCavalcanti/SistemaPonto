from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from .services import get_current_user
from .api import auth_router, empresa_router, funcio_router, ponto_router, pdf_router, relogios_router, desktop_router

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
app.include_router(funcio_router, dependencies=[Depends(get_current_user)])
app.include_router(empresa_router, dependencies=[Depends(get_current_user)])
app.include_router(ponto_router, dependencies=[Depends(get_current_user)])
app.include_router(pdf_router, dependencies=[Depends(get_current_user)])
app.include_router(relogios_router, dependencies=[Depends(get_current_user)])
app.include_router(desktop_router)