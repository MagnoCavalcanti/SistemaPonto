from pydantic import BaseModel
from datetime import datetime

class DictDesktop(BaseModel):

    type: str
    timestamp: datetime
    payload: dict

    def to_json(self):
        return {
            "type": self.type,
            "timestamp": self.timestamp.isoformat(),
            "payload": self.payload
        }
