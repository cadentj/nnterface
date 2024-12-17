from typing import Literal, List

from .base import Node, NodeData
from .collections import ListNode
from .inputs import InputNode, ChatNode


class ContextNode(Node):
    """Base class for all context nodes.

    Attributes:
        code (str): Code for the context node.
        data (NodeData): Data for the context node.
        defaults (List[ListNode]): Default nodes are nodes whose information is important
            to the function of the context node. E.g. a list needs to be defined before a one can
            append items to it in a loop.
    """

    code: str
    data: NodeData

    # This is temporarily `List[ListNode]` but could include other collection types in the future.
    defaults: List[ListNode] = []

    def add_default(self, node: ListNode) -> None:
        self.defaults.append(node)

    # Override the compile method to include the defaults
    def compile(self) -> str:
        code = "\n".join([self.indent() + line.defn for line in self.defaults])
        code += "\n" + self.indent() + self.code
        return code


class SessionNode(ContextNode):
    id: Literal["session"]
    type: Literal["session"] = "session"
    data: NodeData = NodeData(parents=[""], variant="context")

    code: str = "with model.session() as session:"

    def precompile(self, args: List[Node]):
        pass


# This is sort of arbitrary and should be an argument on the node itself. E.g. with a slider on the frontend.
# TODO: Make this an argument on the node itself.
MAX_NEW_TOKENS = 10


class RunNode(ContextNode):
    """Node defining a `.trace` context in NNsight.

    Attributes:
        code (str): Code for the run node.
        generate (str): Code for the generate context.
    """

    type: Literal["run"]
    code: str = "with model.trace({input}) as tracer:"

    generate: str = "with model.generate({input}_content, max_new_tokens={max_new_tokens}) as generator:"

    def gen(self, input_id: str) -> None:
        """Defines formatting behavior for when a `.generator` context is used rather than a `.trace`.

        Args:
            input_id (str): ID of the input node.

        Returns:
            None
        """

        # self.generate += "\n" + self.indent(extra=1) + "generator.all()"
        self.generate += (
            "\n"
            + self.indent(extra=1)
            + f"{input_id} = model.generator.output.tolist().save()"
        )
        self.code = self.generate.format(input=input_id, max_new_tokens=MAX_NEW_TOKENS)

    def precompile(self, args: List[Node]) -> None:
        input_node = [arg for arg in args if isinstance(arg, (InputNode, ChatNode))]

        if len(input_node) == 0:
            self.code = self.code.format(input="")
            return

        input_id = "" if not input_node else input_node[0].id

        if isinstance(input_node[0], ChatNode):
            self.gen(input_id)
        else:
            self.code = self.code.format(input=input_id)


class BatchNode(ContextNode):
    """Node defining a `.batch` context in NNsight.

    Attributes:
        code (str): Code for the batch node.
    """

    type: Literal["batch"]
    code: str = "with tracer.invoke({input}):"

    def precompile(self, args: List[Node]) -> None:
        input_node = [arg for arg in args if isinstance(arg, (InputNode))]

        input_id = "" if not input_node else input_node[0].id

        self.code = self.code.format(input=input_id)


class LoopData(NodeData):
    """Data for the loop node.

    Attributes:
        start (str): Start index of the loop.
        end (str): End index of the loop.
    """

    start: str
    end: str


class LoopNode(ContextNode):
    """Node defining a `.loop` context in NNsight.

    Attributes:
        code (str): Code for the loop node.
    """

    type: Literal["loop"]
    data: LoopData
    code: str = "for {id} in range({start}, {end}):"

    def precompile(self, args: List[Node]) -> None:
        self.code = self.code.format(
            id=self.id, start=self.data.start, end=self.data.end
        )
