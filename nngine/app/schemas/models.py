from pydantic import BaseModel

class LoadModelRequest(BaseModel):
    repo_id: str