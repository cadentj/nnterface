from typing import Literal

from pydantic import BaseModel

class Edge(BaseModel):
    source: str
    target: str

    loop_type: Literal["in->out", "out->in", "in->in", "out->out"] = None


