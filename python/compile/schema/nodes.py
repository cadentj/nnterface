from pydantic import BaseModel
from typing import Literal, Optional, List
from abc import ABC, abstractmethod

SPACES = "  "

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
        if self.data.parents != [""]:
            return SPACES * len(self.data.parents)
        return ""

    def compile(self, args: List["Node"]):
        return self.indent() + self.generate(args)

### MODULE NODE SCHEMA ###

class ModuleData(NodeData):
    location: Literal["input", "output"] = "output"
    mode: Literal["act", "grad"] = "act"
    save: bool = False
    moduleName: str

class ModuleNode(Node):
    type: Literal["module"]
    data: ModuleData
    code: str = "{id} = {module}.{location}"

    def generate(self, args: List[Node]):

        if len(args) >= 1: 
            return "PENISPENIS"

        return self.code.format(
            id=self.id, module=self.data.moduleName, location=self.data.location
        )

### INPUT NODE SCHEMA ###

class InputData(NodeData):
    label: Literal["input"]
    text: str

class InputNode(Node):
    type: Literal["input"] 
    data: InputData
    code: str = "{id} = '{text}'"

    def generate(self, args: List[Node]):
        return self.code.format(
            id=self.id, text=self.data.text
        )

### LOOP SCHEMA ###

# class LoopNode(Node):
#     type: Literal["loop"]
#     code: str = "for {id} in {range}:"

#     def generate(self, args: List[Node]):
#         return self.code.format(
#             id=self.id, text=self.data.text
#         )

### FUNCTION SCHEMA ###

# class FunctionNode(Node):
#     type: Literal["function"]
#     define: str = "def {id}({args}):\n{body}" 
#     code: str = "{id}({args})"

#     def generate(self, args: List[Node]):
#         return self.code.format(
#             id=self.id, args=args
#         )

### RUN SCHEMA ###

class RunData(NodeData):
    label: Literal["run"]

class RunNode(Node):
    type: Literal["context"] 
    data: RunData
    code: str = "with model.trace({input}) as tracer:"

    # NOTE: This should be an input node.
    def generate(self, args: List[Node]):
        if not args:
            return self.code.format(
                id=self.id, input=""
            )

        return self.code.format(
            id=self.id, input=args[0].id
        )
    
### BATCH SCHEMA ###

class BatchData(NodeData):
    label: Literal["batch"]

class BatchNode(Node):
    type: Literal["context"]
    data: BatchData
    code: str = "with tracer.invoke({input}):"

    def generate(self, args: List[Node]):
        input_node = args[0]
        assert isinstance(input_node, InputNode)

        return self.code.format(
            id=self.id, input=input_node.id
        )