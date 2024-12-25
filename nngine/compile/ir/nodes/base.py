from typing import List

from pydantic import BaseModel, ConfigDict, model_validator
from pydantic.alias_generators import to_camel

SPACES = "  "


class NodeData(BaseModel):
    """Data for a node.

    Attributes:
        parents (List[str]): List of all parent node ids, sorted from outermost to innermost.
        variant (str): Variant of the node used for parsing. E.g. `context` nodes may have types
            [`loop`, `run`, `batch`] but parsing just needs to know it's a context node.
    """

    model_config = ConfigDict(
        alias_generator=to_camel,
    )

    parents: List[str]
    variant: str


class Node(BaseModel):
    """Base class for all nodes.

    Attributes:
        id (str): ID of the node. Typically formatted as `{type}{number}`.
        parent (str): ID of the parent node. Automatically added after validation.
        code (str): IR code of the node, to be compiled and formatted.
        data (NodeData): Relevant data for the node. E.g. loop indices.
    """

    model_config = ConfigDict(
        alias_generator=to_camel,
    )

    id: str
    parent: str = None

    code: str = ""
    data: NodeData

    @model_validator(mode="after")
    def set_parent(self) -> "Node":
        self.parent = self.data.parents[-1]
        return self

    def indent(self, extra: int = 0) -> str:
        """Returns an indentation string for the node.

        Args:
            extra (int): Extra indentation to add.

        Returns:
            str: A string of whitespaces.
        """
        if self.data.parents != [""]:
            return SPACES * (len(self.data.parents) + extra)
        return ""

    def filter_args(self, args: List["Node"], n: int = 1):
        args = [n for n in args if n.data.variant != "context"]

        assert len(args) == n

        return args[0] if n == 1 else args

    def compile(self) -> str:
        """Compiles the node into IR code.

        Returns:
            str: IR code of the node.
        """
        return self.indent() + self.code

    def precompile(self, args: List["Node"]):
        """Precompiles the node.

        Args:
            args (List[Node]): List of incoming nodes.
        """
        raise NotImplementedError
