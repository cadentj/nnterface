from pydantic import BaseModel
from typing import Literal, Optional, List
from abc import ABC, abstractmethod

### BASE SCHEMA ###

class NodeData(BaseModel):
    parents: List[str]
    label: str

class Node(BaseModel, ABC):
    id: Optional[str]
    data: NodeData
    type: str
    code: str

    @abstractmethod
    def generate(self, args: List["Node"]):
        pass

    def indent(self):
        return "\t" * len(self.data.parents)

    def compile(self, args: List["Node"]):
        return self.indent() + self.generate(args)

### MODULE NODE SCHEMA ###

class ModuleData(NodeData):
    # module: str
    location: Literal["input", "output"]
    mode: Literal["act", "grad"] = "act"
    save: bool = False

class ModuleNode(Node):
    type: Literal["module"]
    code: str = "{module}.{location}"

    def generate(self, args: List[Node]):
        return self.code.format(
            module=self.label, location=self.location
        )

### INPUT NODE SCHEMA ###

class InputData(NodeData):
    text: str

class InputNode(Node):
    type: Literal["input"] 
    code: str = "{id} = {text}"

    def generate(self, args: List[Node]):
        return self.code.format(
            id=self.id, text=self.data.text
        )

### LOOP SCHEMA ###

class LoopNode(Node):
    type: Literal["loop"]
    code: str = "for {id} in {range}:"

    def generate(self, args: List[Node]):
        return self.code.format(
            id=self.id, text=self.data.text
        )

### FUNCTION SCHEMA ###

class FunctionNode(Node):
    type: Literal["function"]
    define: str = "def {id}({args}):\n{body}" 
    code: str = "{id}({args})"

    def generate(self, args: List[Node]):
        return self.code.format(
            id=self.id, args=args
        )

### RUN SCHEMA ###

class RunNode(Node):
    type: Literal["run"] 
    code: str = "with model.trace({input}) as tracer:"

    def generate(self, args: List[Node]):
        input_node = args[0]
        assert isinstance(input_node, InputNode)

        return self.code.format(
            id=self.id, input=input_node.id
        )

# class BatchNode(Node):
#     type: Literal["batch"]
#     code: str = "with tracer.invoke({input}):"