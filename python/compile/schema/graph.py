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

        nodes = {node.id : node for node in self.nodes}

        for node in self.nodes:
            current_node = node
            while current_node.data.parents != [""]:
                parent = current_node.data.parents[0]
                self.edges.append(Edge(source=parent, target=node.id))
                current_node = nodes[parent]

        return self
