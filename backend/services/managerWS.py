from fastapi import WebSocket
from datetime import datetime, date, time

import os
import sys
absolut_path = os.path.abspath(os.curdir)
sys.path.insert(0, absolut_path)

from backend.schemas.relogio import Relogio

class ConnectionManager:
    def __init__(self) -> None:
        self.active_connections: dict[str, WebSocket] = {}
        
    async def connection(self, empresa: str, websocket: WebSocket) -> None:
        await websocket.accept()
        self.active_connections[empresa] = websocket
        await self.send_personal_message(
            message="Conexão estabelecida!",
            empresa=empresa,
            websocket= websocket
            )
    
    def disconnection(self, websocket: WebSocket) -> None:
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, empresa: str, websocket: WebSocket) -> None:
        messageJson = {
            "message": message,
            "client": empresa,
            "timestamp": datetime.now().isoformat()
        }
        try:
            await websocket.send_json(messageJson)
        except Exception as e:
            print(f"Erro ao enviar mensagem: {e}")
            

    async def broadcast(self, message: str) -> None:
        for connection in self.active_connections:
            await connection.send_text(message)

    async def send_req_for_export_registers(self, empresa: str, rep: Relogio, data_inicio: date, data_fim: date) -> None:
        if empresa in self.active_connections.keys():
            try:
                websocket = self.active_connections[empresa]
                message = {
                    "empresa": empresa,
                    "Rep": rep,
                    "data_inicio": data_inicio,
                    "data_fim": data_fim
                }
                await websocket.send_json(message)
                return True
            except Exception as e:
                print(f"Erroa ao enviar comando: {e}")
                
        