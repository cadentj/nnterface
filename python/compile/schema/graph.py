from typing import Dict, List, Tuple, Optional

from pydantic import BaseModel, model_validator, Field


# Note that I ignore most of the Node/Edge props.

class NodeData(BaseModel):
    text: Optional[str] = ""
    label: Optional[str] = ""
    value: Optional[str] = ""


class Node(BaseModel):
    id: str
    type: str
    data: NodeData


class EdgeData(BaseModel):
    label: Optional[str] = ""


class Edge(BaseModel):
    id: str
    source: str
    target: str


class Graph(BaseModel):
    nodes: List[Node]
    edges: List[Edge] 
    adjacency_list: Dict[Node, List[Node]] = None

    # @model_validator(mode="after")
    # def build_adjacency_list(self):
    #     pass