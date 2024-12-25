from typing import Literal, List, Dict

from pydantic import model_validator

from .context import ContextNode
from .collections import ListNode
from .base import Node, NodeData, SPACES


class FunctionData(NodeData):
    variant: Literal["function"]
    function_name: str

    code: str
    inputs: List[str]
    typed_args: Dict[str, str]

    @model_validator(mode="after")
    def set_inputs(self):
        inputs = ", ".join(self.inputs)

        if self.typed_args:
            typed_args = list(self.typed_args.keys())
            typed_args_str = ", ".join(typed_args)
            inputs = f"{inputs}, " + typed_args_str

        self.inputs = inputs
        return self


class FunctionNode(Node):
    type: Literal["function"]
    data: FunctionData

    code: str = None
    defn: str = "def _{id}({args}):\n  {body}"

    handle_dict: dict = {}

    def protocol(self, op: Literal["setter", "append"]):
        self.code = {
            "setter" : "{id} = _{id}({args})",
            "append" : "{id}_list.append(_{id}({args}))"
        }[op]

    def _define(self):
        return self.defn.format(
            id=self.id,
            args=self.data.inputs,
            body=self.data.code,
        )

    def _call(self, template: str, args: List[str]):
        typed_args = [f"{k} = {v}" for k, v in self.data.typed_args.items()]

        all_args = ", ".join(typed_args)
        all_args = f"{args}, " + all_args

        if len(typed_args) == 0:
            all_args = args

        return template.format(id=self.id, args=all_args)

    def precompile(self, args: List[Node]):
        args_str = [f"{key} = {value}" for key, value in self.handle_dict.items()]
        args_str = ", ".join(args_str)

        indented_code = []
        for i, line in enumerate(self.data.code.split("\n")):
            if i != 0:
                indented_code.append(SPACES + line)
            else:
                indented_code.append(line)

        self.data.code = "\n".join(indented_code)

        self.code = self._call(self.code, args_str)

        return self._define()
