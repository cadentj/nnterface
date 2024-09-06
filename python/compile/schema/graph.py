from typing import List, Union

from pydantic import BaseModel, model_validator

from .nodes import (
    InputNode,
    FunctionNode,
    ModuleNode,
    LoopNode,
    RunNode,
)

from .edges import Edge


class Graph(BaseModel):
    nodes: List[Union[InputNode, FunctionNode, ModuleNode, LoopNode, RunNode]]
    edges: List[Edge]

    @model_validator(mode="after")
    def unfold(self):
        for node in self.nodes:
            current_node = node
            while hasattr(current_node, "parent"):
                parent = current_node.parents[0]
                self.edges.append(Edge(source=parent, target=node.id))
                current_node = parent

        return self
