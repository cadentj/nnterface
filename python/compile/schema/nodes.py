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

    def compile(self):
        return self.indent() + self.code

    def precompile(self, args: List["Node"]):
        raise NotImplementedError

    

### SESSION NODE SCHEMA ###


class SessionNode(Node): 
    id: Literal["session"]
    type: Literal["context"] = "context"
    data: NodeData = Field(default_factory=lambda: NodeData(parents=[""]))

    code: str = "with model.session() as session:"

    def precompile(self, args: List[Node]):
        return None


### MODULE NODE SCHEMA ###


class ModuleData(NodeData):
    label: Literal["module"]
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
    looped_getter: str = "{id}.append({module}.{location})"
    setter: str = "{module}.{location} = {arg_id}"

    code: str = None

    protocol: Literal["getter", "setter", "looped_getter"] = None

    def _set(self, arg: Node): 
        self.code = self.setter.format(
            module=self.data.module_name, 
            location=self.data.location, 
            arg_id=arg.id
        )

    def _get(self): 
        if self.protocol == "looped_getter":
            self.code = self.looped_getter.format(
                id=self.id, 
                module=self.data.module_name, 
                location=self.data.location
            )

            return f"{self.id} = []"
        else:
            self.code = self.getter.format(
                id=self.id, 
                module=self.data.module_name, 
                location=self.data.location
            )

    def precompile(self, args: List[Node]):
        module_node = [arg for arg in args if isinstance(arg, ModuleNode)]

        if len(module_node) == 1:
            return self._set(module_node[0])
        elif len(module_node) == 0:
            return self._get()
        else:
            raise ValueError("Module node has too many connections. Check for bugs?")


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



### FUNCTION SCHEMA ###


class FunctionData(NodeData):
    label: Literal["function"]
    function_name: str

    code: str
    inputs: List[str]


class FunctionNode(Node):
    type: Literal["function"]
    data: FunctionData

    code: str = "{id} = {id}({args})"
    defn: str = "def {id}({args}):\n  {body}"

    def precompile(self, args: List[Node]):
        args: str = ", ".join([arg.id for arg in args])

        self.code = self.code.format(id=self.id, args=args)

        return self.defn.format(id=self.id, args=self.data.inputs, body=self.data.code)


### RUN SCHEMA ###


class RunData(NodeData):
    label: Literal["run"]

class RunNode(Node):
    type: Literal["context"]
    data: RunData
    
    code: str = "with model.trace({input}) as tracer:"

    def precompile(self, args: List[Node]):
        self.code = self.code.format(input=args[0].id)
    

### BATCH SCHEMA ###

class BatchData(NodeData):
    label: Literal["batch"]

class BatchNode(Node):
    type: Literal["context"]
    data: BatchData
    
    code: str = "with model.invoke({input}):"

    def precompile(self, args: List[Node]):
        self.code = self.code.format(input=args[0].id)


### LOOP SCHEMA ###

class LoopData(NodeData):
    label: Literal["loop"]

class LoopNode(Node):
    type: Literal["context"]
    data: LoopData
    code: str = "for {id} in range({start}, {end}):"

    def precompile(self, args: List[Node]):
        pass
