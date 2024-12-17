from typing import Literal, List

from pydantic import model_validator

from .base import Node, NodeData
from .function import FunctionNode
from .collections import ListNode


class ModuleData(NodeData):
    """Data for the module node.

    Attributes:
        module_name (str): Name of the module.
        location (Literal["input", "output"]): Location on the module at which to get activations.
        variable (str): Original index of the module if it's in a module list.
        is_tuple (bool): Whether the output of the module is a tuple.
        is_variable (bool): Whether the module is part of a module list.
        index (str): Index to get the module from a list.
        save (bool): Whether to save the module.
    """

    variant: Literal["module"]
    module_name: str
    location: Literal["input", "output"] = "output"

    variable: str

    is_tuple: bool
    is_variable: bool
    index: str = ""

    save: bool = False

    @model_validator(mode="after")
    def set_variable(self):
        if self.is_variable:
            self.module_name = self.module_name.replace(".<VAR>", f"[{self.variable}]")
        return self


class ModuleNode(Node):
    """Module node representing some operation on an NNsight Envoy.

    Attributes:
        protocol (Literal["getter", "setter", "append"]): Protocol of the node.
        getter (str): Code for getting a value from the module.
        append (str): Code for appending a value to the module.
        setter (str): Code for setting a value in the module.
    """

    type: Literal["module"]
    data: ModuleData

    code: str = ""

    protocol: Literal["getter", "setter", "append"] = None
    getter: str = "{id} = {module}.{location}{index}"
    append: str = "{id}_list.append({module}.{location}{index})"
    setter: str = "{module}.{location}{index} = {arg_id}"

    def _set(self, arg: Node):
        index = "[0]" if self.data.is_tuple else ""
        index += f"[{self.data.index}]" if self.data.index else "[:]"

        self.code = self.setter.format(
            module=self.data.module_name,
            location=self.data.location,
            arg_id=arg.id,
            index=index,
        )

    def _append(self):
        index = "[0]" if self.data.is_tuple else ""
        index += f"[{self.data.index}]" if self.data.index else ""

        self.code = self.append.format(
            id=self.id,
            module=self.data.module_name,
            location=self.data.location,
            index=index,
        )

    def _get(self):
        index = "[0]" if self.data.is_tuple else ""
        index += f"[{self.data.index}]" if self.data.index else ""

        self.code = self.getter.format(
            id=self.id,
            module=self.data.module_name,
            location=self.data.location,
            index=index,
        )

    def precompile(self, args: List[Node]):
        input_node = [
            arg for arg in args if isinstance(arg, (ModuleNode, FunctionNode, ListNode))
        ]

        assert len(input_node) <= 1

        if input_node:
            return self._set(input_node[0])
        elif self.protocol == "getter":
            return self._get()
        elif self.protocol == "append":
            return self._append()
