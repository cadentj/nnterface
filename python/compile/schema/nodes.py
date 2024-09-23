from pydantic import BaseModel, ConfigDict, model_validator
from pydantic.alias_generators import to_camel

from typing import Literal, Optional, List, Dict

SPACES = "  "

### BASE SCHEMA ###

class NodeData(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
    )

    parents: List[str]
    variant: str


class Node(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
    )

    id: str
    parent: str = None

    code: str = ""

    data: NodeData

    @model_validator(mode="after")
    def set_parent(self):
        self.parent = self.data.parents[-1]
        return self

    def indent(self, extra: int = 0):
        if self.data.parents != [""]:
            return SPACES * (len(self.data.parents) + extra)
        return ""

    def compile(self):
        return self.indent() + self.code

    def precompile(self, args: List["Node"]):
        raise NotImplementedError


### LIST SCHEMA ###


class ListNode(Node):
    type: Literal["list"]

    name: str = None

    code: str = "{name} = nnsight.list()"

    def set_input_id(self, node: Node):
        if self.name is None:
            self.name = node.id + "_list"

        self.code = self.code.format(name=self.name)

    def precompile(self, args: List[Node]):
        pass

    def compile(self):
        return ""


### CONTEXT NODE SCHEMA ###


class ContextNode(Node):
    code: str
    data: NodeData

    defaults: List[str] = []

    def add_default(self, node: ListNode):
        self.defaults.append(node)

    # Override the compile method to include the defaults
    def compile(self):
        self.defaults.append(self)
        return "\n".join([self.indent() + line.code for line in self.defaults])


### SESSION NODE SCHEMA ###


class SessionNode(ContextNode):
    id: Literal["session"]
    type: Literal["session"] = "session"
    data: NodeData = NodeData(parents=[""], variant="context")

    code: str = "with model.session() as session:"

    def precompile(self, args: List[Node]):
        pass


### MODULE NODE SCHEMA ###


class ModuleData(NodeData):
    variant: Literal["module"]
    module_name: str
    location: Literal["input", "output"] = "output"

    is_variable: bool
    loop_variable: str

    save: bool = False
    mode: Literal["act", "grad"] = "act"


class ModuleNode(Node):
    type: Literal["module"]
    data: ModuleData

    getter: str = "{id} = {module}.{location}"
    append: str = "{id}_list.append({module}.{location})"
    setter: str = "{module}.{location} = {arg_id}"

    code: str = None

    protocol: Literal["getter", "setter", "append"] = None

    def _set(self, arg: Node):
        self.code = self.setter.format(
            module=self.data.module_name, location=self.data.location, arg_id=arg.id
        )

    def _append(self):
        self.code = self.append.format(
            id=self.id, module=self.data.module_name, location=self.data.location
        )

    def _get(self):
        self.code = self.getter.format(
            id=self.id, module=self.data.module_name, location=self.data.location
        )

    def precompile(self, args: List[Node]):
        input_node = [arg for arg in args if isinstance(arg, (ModuleNode, ListNode))]

        assert len(input_node) <= 1

        if input_node:
            return self._set(input_node[0])
        elif self.protocol == "getter":
            return self._get()
        elif self.protocol == "append":
            return self._append()


### INPUT NODE SCHEMA ###


class InputData(NodeData):
    variant: Literal["input"]
    text: str


class InputNode(Node):
    type: Literal["input"]
    data: InputData

    defn: str = "{id} = '{text}'"

    def precompile(self, args: List[Node]):
        return self.defn.format(id=self.id, text=self.data.text)


### FUNCTION SCHEMA ###


class FunctionData(NodeData):
    variant: Literal["function"]
    function_name: str

    code: str
    inputs: List[str]

    @model_validator(mode="after")
    def set_inputs(self):
        self.inputs = ", ".join(self.inputs)
        return self


class FunctionNode(Node):
    type: Literal["function"]
    data: FunctionData

    code: str = "{id} = _{id}({args})"
    defn: str = "def _{id}({args}):\n  {body}"
    append: str = "{id}_list.append(_{id}({args}))"

    protocol: Literal["setter", "append"] = "setter"

    def _set(self, args: List[Node]):
        self.code = self.code.format(id=self.id, args=args)

        return self.defn.format(id=self.id, args=self.data.inputs, body=self.data.code)

    def _append(self, args: List[Node]):
        self.code = self.append.format(id=self.id, args=args)

        return self.defn.format(id=self.id, args=self.data.inputs, body=self.data.code)

    def precompile(self, args: List[Node]):
        args: str = ", ".join(
            [arg.id for arg in args if not isinstance(arg, ContextNode)]
        )

        if self.protocol == "setter":
            return self._set(args)
        elif self.protocol == "append":
            return self._append(args)


### RUN SCHEMA ###

MAX_NEW_TOKENS = 100

class RunNode(ContextNode):
    type: Literal["run"]
    code: str = "with model.trace({input}) as tracer:"

    generate: str = "with model.generate({input}_content, max_new_tokens={max_new_tokens}) as generator:"

    def precompile(self, args: List[Node]):
        input_node = [arg for arg in args if isinstance(arg, (InputNode, ChatNode))]

        input_id = "" if not input_node else input_node[0].id

        if isinstance(input_node[0], ChatNode):
            self.generate += "\n" + self.indent(extra=1) + f"{input_id} = model.generator.output.tolist().save()"
            self.code = self.generate.format(input=input_id, max_new_tokens=MAX_NEW_TOKENS)
        else:
            self.code = self.code.format(input=input_id)


### BATCH SCHEMA ###


class BatchNode(ContextNode):
    type: Literal["batch"]
    code: str = "with tracer.invoke({input}):"

    def precompile(self, args: List[Node]):
        input_node = [arg for arg in args if isinstance(arg, (InputNode))]

        input_id = "" if not input_node else input_node[0].id

        self.code = self.code.format(input=input_id)


### LOOP SCHEMA ###


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


### GRAPH SCHEMA ###

class GraphData(NodeData):
    variant: Literal["graph"]
    graph_data: List[float] = []


class GraphNode(Node):
    type: Literal["graph"]
    data: GraphData
    code: str = "{id} = {arg}.save()"

    def precompile(self, args: List[Node]):
        input_node = [arg for arg in args if isinstance(arg, (ListNode))]

        self.code = self.code.format(id=self.id, arg=input_node[0].name)


### CHAT SCHEMA ###

class ChatData(NodeData):
    variant: Literal["chat"]

    messages: List[Dict[str, str]] = [{"role" : "user", "content" : "Hey, how are you?"}]
    tokens: List[int] = []

class ChatNode(Node):
    type: Literal["chat"]
    data: ChatData

    def precompile(self, args: List[Node]):
        pass

    def tokenize(self, tok):
        self.data.tokens = tok.apply_chat_template(self.data.messages, add_generation_prompt=True)