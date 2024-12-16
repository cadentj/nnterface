from .base import Node, NodeData
from typing import Literal, List
from .collections import ListNode

from .inputs import InputNode, ChatNode


class ContextNode(Node):
    code: str
    data: NodeData

    defaults: List[str] = []

    def add_default(self, node: ListNode):
        self.defaults.append(node)

    # Override the compile method to include the defaults
    def compile(self):
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


MAX_NEW_TOKENS = 10

class RunNode(ContextNode):
    type: Literal["run"]
    code: str = "with model.trace({input}) as tracer:"

    generate: str = "with model.generate({input}_content, max_new_tokens={max_new_tokens}) as generator:"

    def gen(self, input_id):
        # self.generate += "\n" + self.indent(extra=1) + "generator.all()"
        self.generate += "\n" + self.indent(extra=1) + f"{input_id} = model.generator.output.tolist().save()"
        self.code = self.generate.format(input=input_id, max_new_tokens=MAX_NEW_TOKENS)

    def precompile(self, args: List[Node]):
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
    type: Literal["batch"]
    code: str = "with tracer.invoke({input}):"

    def precompile(self, args: List[Node]):
        input_node = [arg for arg in args if isinstance(arg, (InputNode))]

        input_id = "" if not input_node else input_node[0].id

        self.code = self.code.format(input=input_id)


class LoopData(NodeData):
    start: str
    end: str

class LoopNode(ContextNode):
    type: Literal["loop"]
    data: LoopData
    code: str = "for {id} in range({start}, {end}):"

    lists: List[str] = []

    def precompile(self, args: List[Node]):
        self.code = self.code.format(
            id=self.id, start=self.data.start, end=self.data.end
        )

