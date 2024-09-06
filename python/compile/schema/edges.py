from typing import Optional

from pydantic import BaseModel

class EdgeData(BaseModel):
    label: Optional[str] = ""

class Edge(BaseModel):
    id: Optional[str] = ""
    source: str
    target: str


