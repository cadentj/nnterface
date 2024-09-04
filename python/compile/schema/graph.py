from typing import Dict, List, Tuple

from pydantic import BaseModel

class Measured(BaseModel):
    width: int
    height: int


class Position(BaseModel):
    x: int
    y: int


class NodeData(BaseModel):
    text: str


class Node(BaseModel):
    id: str
    type: str
    data: NodeData
    origin: Tuple[int, int]
    position: Position
    measured: Measured


class Viewport(BaseModel):
    x: int
    y: int
    zoom: float


class Graph(BaseModel):
    nodes: List[Node]
    edges: List[Dict]  # Assuming edges are complex objects that can be defined later
    viewport: Viewport
