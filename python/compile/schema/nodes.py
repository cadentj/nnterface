from pydantic import BaseModel, ConfigDict, model_validator
from pydantic.alias_generators import to_camel

from typing import Literal, Optional, List

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

### LIST SCHEMA ###

class ListData(NodeData):
    pass

class ListNode(Node):
    type: Literal["list"]
    code: str = "{id}_list = nnsight.list()"
    data: ListData

    def set_input_id(self, node: Node):
        self.code = self.code.format(id=node.id)
    
    def precompile(self, args: List[Node]):
        pass

    def compile(self):
        return ""
    
### CONTEXT NODE SCHEMA ###

class ContextNode(Node): 
    type: Literal["context"]
    code: str

    defaults: List[str] = []

    def add_default(self, node: ListNode):
        self.defaults.append(node.code)

    # Override the compile method to include the defaults
    def compile(self):
        self.defaults.append(self.code)
        return "\n".join([self.indent() + line for line in self.defaults])

### SESSION NODE SCHEMA ###

class SessionNode(ContextNode): 
    id: Literal["session"]
    type: Literal["context"] = "context"
    data: NodeData = NodeData(parents=[""])

    code: str = "with model.session() as session:"

    def precompile(self, args: List[Node]):
        pass
    

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
    append: str = "{id}_list.append({module}.{location})"
    setter: str = "{module}.{location} = {arg_id}"

    code: str = None

    protocol: Literal["getter", "setter", "append"] = None

    def _set(self, arg: Node): 
        self.code = self.setter.format(
            module=self.data.module_name, 
            location=self.data.location, 
            arg_id=arg.id
        )

    def _append(self): 
        self.code = self.append.format(
            id=self.id, 
            module=self.data.module_name, 
            location=self.data.location
        )

    def _get(self): 
        self.code = self.getter.format(
            id=self.id, 
            module=self.data.module_name, 
            location=self.data.location
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

    code: str = "{id} = _{id}({args})"
    defn: str = "def _{id}({args}):\n  {body}"
    append: str = "{id}_list.append(_{id}({args}))"

    protocol: Literal["setter", "append"] = "setter"

    def _set(self, args: List[Node]):
        self.code = self.code.format(id=self.id, args=args)

        return self.defn.format(id=self.id, args=args, body=self.data.code)
    
    def _append(self, args: List[Node]):
        self.code = self.append.format(id=self.id, args=args)

        return self.defn.format(id=self.id, args=args, body=self.data.code)

    def precompile(self, args: List[Node]):
        args: str = ", ".join([arg.id for arg in args if not isinstance(arg, ContextNode)])

        if self.protocol == "setter":
            return self._set(args)
        elif self.protocol == "append":
            return self._append(args)



### RUN SCHEMA ###


class RunData(NodeData):
    label: Literal["run"]

class RunNode(ContextNode):
    data: RunData
    
    code: str = "with model.trace({input}) as tracer:"

    def precompile(self, args: List[Node]):
        self.code = self.code.format(input=args[0].id)
    

### BATCH SCHEMA ###

class BatchData(NodeData):
    label: Literal["batch"]

class BatchNode(ContextNode):
    data: BatchData
    
    code: str = "with model.invoke({input}):"

    def precompile(self, args: List[Node]):
        self.code = self.code.format(input=args[0].id)


### LOOP SCHEMA ###

class LoopData(NodeData):
    label: Literal["loop"]

class LoopNode(ContextNode):
    data: LoopData
    code: str = "for {id} in range({start}, {end}):"

    lists: List[str] = []

    def precompile(self, args: List[Node]):
        pass


