from typing import Literal, List

from .base import Node, NodeData
from .collections import ListNode


class GraphData(NodeData):
    variant: Literal["graph"]
    graph_data: List[float] = []

    graph_type: Literal["line", "heatmap"] = "line"

class GraphNode(Node):
    type: Literal["graph"]
    data: GraphData
    code: str = "{id} = {arg}.save()"

    def precompile(self, args: List[Node]):
        input_node = [arg for arg in args if isinstance(arg, (ListNode))]

        self.code = self.code.format(id=self.id, arg=input_node[0].name)
