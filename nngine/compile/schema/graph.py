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
    ListNode,
    GraphNode,
    ChatNode,
    ComponentNode
)


class Graph(BaseModel):
    nodes: List[
        Union[
            GraphNode,
            InputNode,
            ModuleNode,
            RunNode,
            FunctionNode,
            BatchNode,
            LoopNode,
            ListNode,
            ChatNode,
            ComponentNode
        ]
    ]
    edges: List[Edge]

    lookup: Dict[str, Node] = {}

    @model_validator(mode="after")
    def add_scope(self):
        random_node_parents = self.nodes[0].data.parents
        use_session = "session" in random_node_parents
    
        if use_session:
            print("Adding session node")
            self.nodes.append(SessionNode(id="session"))
        else:
            print("Using component node")
            # for node in self.nodes:
            #     # Remove the top node
            #     node.data.parents = node.data.parents[1:]

        return self

    @model_validator(mode="after")
    def add_lookup(self):
        self.lookup = {node.id: node for node in self.nodes}
        return self