from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from datetime import datetime


desktop_router = APIRouter()

class ConnectionManager:
    def __init__(self) -> None:
        self.active_connections: list[WebSocket] = []
        
    async def connection(self, empresa: str, websocket: WebSocket) -> None:
        await websocket.accept()
        self.active_connections.append(websocket)
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
            self.disconnection(websocket)

    async def broadcast(self, message: str) -> None:
        for connection in self.active_connections:
            await connection.send_text(message)


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
        
