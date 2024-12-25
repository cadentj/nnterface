from .base import Node
from typing import Literal, List


SPACES = "  "

class ListNode(Node):
    """List node. Appends a value to a list, or multiple if the input is in a loop.

    Attributes:
        name (str): Name of the list.
        code (str): IR code of the node.
        defn (str): Definition of the node.
    """

    type: Literal["list"]

    code: str = "{id}.append({arg_id})"
    defn: str = "{id} = nnsight.list()"

    def precompile(self, args: List[Node]):
        input_node = [n for n in args if n.data.variant != "context"]

        assert len(input_node) <= 1, "Too many list inputs, check for bugs?"

        self.code = self.code.format(id=self.id, arg_id=input_node[0].id)
        self.defn = self.defn.format(id=self.id)

