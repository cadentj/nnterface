from pydantic import BaseModel
from typing import Literal, Optional


class NodeData(BaseModel):
    label: str = ""

class Node(BaseModel):
    id: str
    type: str

class ModuleNode(Node):
    type: Literal["module"]

class InputNode(Node):
    type: Literal["input"] 

class LoopNode(Node):
    type: Literal["loop"]

class FunctionNode(Node):
    type: Literal["function"]   

class RunNode(Node):
    type: Literal["run"] 