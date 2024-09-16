from typing import List, Union, Dict

from pydantic import BaseModel, model_validator

from .edges import Edge
from .nodes import (
    Node,
    SessionNode,
    InputNode,
    ModuleNode,
    RunNode,
    FunctionNode,
    BatchNode,
    LoopNode,
)


class Graph(BaseModel):
    nodes: List[
        Union[InputNode, ModuleNode, RunNode, FunctionNode, BatchNode, LoopNode]
    ]
    edges: List[Edge]

    lookup: Dict[str, Node] = {}

    ### PRECOMPILATION ###

    @model_validator(mode="after")
    def add_session(self):
        self.nodes.append(SessionNode(id="session"))
        return self

    @model_validator(mode="after")
    def build_lookup(self):
        self.lookup = {node.id: node for node in self.nodes}
        return self

    @model_validator(mode="after")
    def resolve_dependencies(self):
        """Ensure contexts are processed correctly."""

        edges = []
        for edge in self.edges:
            src = self.lookup[edge.source]
            tar = self.lookup[edge.target]  

            match (len(src.data.parents), len(tar.data.parents)):

                # A connection to a node of greater depth should
                # connect to the top parent of the target node.
                # This ensures that nodes are topologically sorted correctly.
                case (x, y) if x < y: 

                    other = self.get_top_parent(tar.id, level=src.parent)
                    edges.append(Edge(source=src.id, target=other))

                case (x, y) if (
                    x == y
                    and src.parent != tar.parent
                ): 
                    
                    edges.append(Edge(source=src.id, target=tar.parent))

        self.edges.extend(edges)

        return self

    @model_validator(mode="after")
    def unfold_edges(self):
        def unfold_context(node: Node):
            if node.data.parents == [""]:
                return

            parent_id = node.data.parents[-1]
            edge = Edge(source=parent_id, target=node.id)
            self.edges.append(edge)

        for node in self.nodes:
            unfold_context(node)

        return self

    def get_top_parent(self, node_id: str, level: str = "session") -> str:
        node = self.lookup[node_id]
        while node.parent != level:
            node = self.lookup[node.parent]
        return node.id

    def precompile(self, sorted_nodes: List[Node]):
        code = []

        for node in sorted_nodes:
            line: str | None = node.precompile(self.lookup)
            if line is not None:
                code.append(line)

        return code
