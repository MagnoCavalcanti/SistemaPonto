from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.responses import StreamingResponse
from io import BytesIO

import os
import sys
absolut_path = os.path.abspath(os.curdir)
sys.path.insert(0, absolut_path)

from backend.services import PDFGenerator_Repo, verificar_empresa
from backend.database.seed_data import get_db_session

pdf_router = APIRouter(prefix="/{empresa}/pdf")

@pdf_router.get("/generate")
async def generate_pdf(db: Session =Depends(get_db_session), empresa: str = None):
    empresa_id = verificar_empresa(empresa, db)
    pdf_generator = PDFGenerator_Repo(db)
    html = pdf_generator.generate_html(empresa_id=empresa_id)
    pdf = pdf_generator.generate_pdf(html)
    return StreamingResponse(BytesIO(pdf), media_type="application/pdf")