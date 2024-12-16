from .base import Node
from typing import Literal, List

class ListNode(Node):
    type: Literal["list"]

    name: str = None

    code: str = ""
    defn: str = "{name} = nnsight.list()"

    protocol: Literal["append", "none"] = "none"

    append: str = "{name}.append({arg_id})"

    def set_input_id(self, node: Node):
        if self.name is None:
            self.name = node.id + "_list"

        self.defn = self.defn.format(name=self.name)

    def precompile(self, args: List[Node]):
        if self.protocol == "append":
            input_node = [arg for arg in args if isinstance(arg, (ListNode))]
            self.code = self.append.format(name=self.name, arg_id=input_node[0].name)
