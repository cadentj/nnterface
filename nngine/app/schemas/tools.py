from pydantic import BaseModel

class TokenizeRequest(BaseModel):
    text: str