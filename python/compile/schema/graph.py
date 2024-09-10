from typing import List, Union

from pydantic import BaseModel, model_validator

from .nodes import (
    InputNode,
    ModuleNode,
    RunNode,
    BatchNode
)

from .edges import Edge


class Graph(BaseModel):
    nodes: List[Union[InputNode, ModuleNode, RunNode, BatchNode]]
    edges: List[Edge]

    @model_validator(mode="after")
    def unfold(self):

        nodes = {node.id : node for node in self.nodes}

        edges = set()

        for node in self.nodes:
            current_node = node
            while current_node.data.parents != [""]:
                parent_id = current_node.data.parents[-1]
                edges.add((parent_id, current_node.id))
                current_node = nodes[parent_id]

        self.edges.extend([
            Edge(source=edge[0], target=edge[1])
            for edge in edges
        ])

        return self
