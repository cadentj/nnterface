from .base import Node, NodeData
from typing import Literal, List

from pydantic import model_validator
from .function import FunctionNode
from .collections import ListNode


class ModuleData(NodeData):
    variant: Literal["module"]
    module_name: str
    location: Literal["input", "output"] = "output"

    variable: str

    is_tuple: bool
    is_variable: bool
    index: str = ""

    save: bool = False
    mode: Literal["act", "grad"] = "act"

    @model_validator(mode="after")
    def set_variable(self):
        if self.is_variable:
            self.module_name = self.module_name.replace(".<VAR>", f"[{self.variable}]")
        return self


class ModuleNode(Node):
    type: Literal["module"]
    data: ModuleData

    getter: str = "{id} = {module}.{location}{index}"
    append: str = "{id}_list.append({module}.{location}{index})"
    setter: str = "{module}.{location}{index} = {arg_id}"

    code: str = "EMPTY"

    protocol: Literal["getter", "setter", "append"] = None

    def _set(self, arg: Node):
        index = "[0]" if self.data.is_tuple else ""
        index += f"[{self.data.index}]" if self.data.index else "[:]"

        self.code = self.setter.format(
            module=self.data.module_name, location=self.data.location, arg_id=arg.id, index=index
        )

    def _append(self):
        index = "[0]" if self.data.is_tuple else ""
        index += f"[{self.data.index}]" if self.data.index else ""
        
        self.code = self.append.format(
            id=self.id, module=self.data.module_name, location=self.data.location, index=index
        )

    def _get(self):
        index = "[0]" if self.data.is_tuple else ""
        index += f"[{self.data.index}]" if self.data.index else ""

        self.code = self.getter.format(
            id=self.id, module=self.data.module_name, location=self.data.location, index=index
        )

    def precompile(self, args: List[Node]):
        input_node = [arg for arg in args if isinstance(arg, (ModuleNode, FunctionNode, ListNode))]

        assert len(input_node) <= 1

        if input_node:
            return self._set(input_node[0])
        elif self.protocol == "getter":
            return self._get()
        elif self.protocol == "append":
            return self._append()

