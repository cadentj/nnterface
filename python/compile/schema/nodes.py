from pydantic import BaseModel, ConfigDict, Field, model_validator
from pydantic.alias_generators import to_camel

from typing import Literal, Optional, List, Dict

SPACES = "  "


### BASE SCHEMA ###


class NodeData(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
    )

    parents: List[str]

class Node(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
    )
        
    id: Optional[str]
    parent: str = None

    @model_validator(mode="after")
    def set_parent(self):
        self.parent = self.data.parents[-1]
        return self

    def indent(self):
        if self.data.parents != [""]:
            return SPACES * len(self.data.parents)
        return ""

    def generate(self):
        return self.indent() + self.compile()

    def precompile(self, lookup: Dict[str, "Node"]):
        raise NotImplementedError

    def compile(self):
        raise NotImplementedError
    
class SessionNode(Node): 
    id: Literal["session"]
    type: Literal["context"] = "context"
    data: NodeData = Field(default_factory=lambda: NodeData(parents=[""]))

### MODULE NODE SCHEMA ###

class ModuleData(NodeData):
    label: Literal["module"]
    module_name: str
    location: Literal["input", "output"] = "output"
    is_variable: bool

    loopVariable: str

    save: bool = False
    mode: Literal["act", "grad"] = "act"


class ModuleNode(Node):
    type: Literal["module"]
    data: ModuleData

    getter: str = "{id} = {module}.{location}"
    looped_getter: str = "{id} = {module}.{location}[{loopVariable}]"
    setter: str = "{module}.{location} = {arg}"

    code: str = None

    def _set(self, arg: Node): 
        self.code = self.setter.format(
            module=self.data.module_name, 
            location=self.data.location, 
            arg=arg.id
        )

    def _get(self):
        pass

    def precompile(self, lookup: Dict[str, Node]):
        module_nodes = [lookup[src] for src in self.source if "module" in src]

        if len(module_nodes) == 0:
            self._get()
        else:
            assert len(module_nodes) == 1, "Only one setter Node allowed."
            self._set(module_nodes[0])


    def compile(self, args: List[Node]):
        return self.code


### INPUT NODE SCHEMA ###


class InputData(NodeData):
    label: Literal["input"]
    text: str = ""


class InputNode(Node):
    type: Literal["input"]
    data: InputData

    defn: str = "{id} = '{text}'"

    def precompile(self, arg: Node):
        return self.defn.format(id=self.id, text=self.data.text)
    
    def compile(self):
        return ""


### FUNCTION SCHEMA ###


class FunctionData(NodeData):
    label: Literal["function"]
    function_name: str

    code: str
    inputs: List[str]


class FunctionNode(Node):
    type: Literal["function"]
    data: FunctionData

    call: str = "{id} = {id}({args})"
    defn: str = "def {id}({args}):\n  {body}"

    def precompile(self, args: List[Node]):
        args: str = ", ".join([arg.id for arg in args])

        self.call = self.call.format(id=self.id, args=args)

        return self.defn.format(id=self.id, args=self.data.inputs, body=self.data.code)

    def compile(self):
        return self.call


### RUN SCHEMA ###


class RunData(NodeData):
    label: Literal["run"]

class RunNode(Node):
    type: Literal["context"]
    data: RunData
    
    code: str = "with model.trace({input}) as tracer:"

    def precompile(self, args: List[Node]):
        in_loop = "loop" in self.data.parents
        if in_loop:
            self.code = self.invoke

    def compile(self, args: List[InputNode]):
        if len(args) == 0:
            return self.code.format(id=self.id, input="")

        return self.code.format(id=self.id, input=args[0].id)
    

### BATCH SCHEMA ###

class BatchData(NodeData):
    label: Literal["batch"]

class BatchNode(Node):
    type: Literal["context"]
    data: BatchData
    
    code: str = "with model.invoke({input}):"

    def precompile(self, args: List[Node]):
        in_loop = "loop" in self.data.parents
        if in_loop:
            self.code = self.invoke

    def compile(self, args: List[InputNode]):
        if len(args) == 0:
            return self.code.format(id=self.id, input="")

        return self.code.format(id=self.id, input=args[0].id)


### LOOP SCHEMA ###

class LoopData(NodeData):
    label: Literal["loop"]

class LoopNode(Node):
    type: Literal["context"]
    data: LoopData
    code: str = "for {id} in range({start}, {end}):"

    def precompile(self, args: List[Node]):
        pass
