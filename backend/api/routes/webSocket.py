from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from datetime import datetime

import os
import sys

absolut_path = os.path.abspath(os.curdir)
sys.path.insert(0, absolut_path)

from backend.services.managerWS import ConnectionManager

desktop_router = APIRouter()


manager = ConnectionManager()

@desktop_router.websocket("/ws/{empresa}")
async def websocket_endpoint(websocket: WebSocket, empresa: str):
    await manager.connection(empresa, websocket)
    try:
        while True:
            data = await websocket.receive_json()
            
    except WebSocketDisconnect:
        manager.disconnection(websocket)
        print("Desconectando...")
    except Exception as e:
        print(f"Erro inesperado: {e}")
        manager.disconnection(websocket)
        
