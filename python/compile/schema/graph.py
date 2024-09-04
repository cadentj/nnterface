from typing import Dict, List, Optional, Union
from collections import defaultdict

from pydantic import BaseModel, model_validator, Field

from .nodes import Node, InputNode, FunctionNode, ModuleNode, LoopNode, RunNode


class EdgeData(BaseModel):
    label: Optional[str] = ""


class Edge(BaseModel):
    id: str
    source: str
    target: str


class Graph(BaseModel):
    nodes: List[Union[InputNode, FunctionNode, ModuleNode, LoopNode, RunNode]]
    edges: List[Edge]
    adjacency_list: Dict[Node, List[Node]] = Field(default=None)

    @model_validator(mode="after")
    def build_adjacency_list(self):
        adjacency_list = defaultdict(list)

        for edge in self.edges:
            adjacency_list[edge.source].append(edge.target)

        self.adjacency_list = dict(adjacency_list)
        return self
