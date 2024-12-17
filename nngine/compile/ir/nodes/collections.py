from .base import Node
from typing import Literal, List

class ListNode(Node):
    """List node. Appends a value to a list, or multiple if the input is in a loop.

    Attributes:
        name (str): Name of the list.
        code (str): IR code of the node.
        defn (str): Definition of the node.
        protocol (Literal["append", "none"]): Protocol of the node. 
            `append` is used when the input is in a loop. `none` blocks the initialization from 
            writing twice.
        append (str): Code to append a value to the list.
    """

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
