from .base import Node, NodeData
from typing import Literal, List, Dict


from pydantic import model_validator
from .context import ContextNode

SPACES = "  "


class FunctionData(NodeData):
    variant: Literal["function"]
    function_name: str

    code: str
    inputs: List[str]
    typed_args: Dict[str, str]

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

    def _define(self):
        typed_args = list(self.data.typed_args.keys())
        typed_args_str = ", ".join(typed_args)
        all_args = f"{self.data.inputs}, " + typed_args_str

        if len(typed_args) == 0:
            all_args = self.data.inputs

        return self.defn.format(
            id=self.id,
            args=all_args,
            body=self.data.code,
        )
    
    def _call(self, template: str, args: List[Node]):
        typed_args = [
            f"{k} = {v}"
            for k, v in self.data.typed_args.items()
        ]

        all_args = ", ".join(typed_args)
        all_args = f"{args}, " + all_args

        if len(typed_args) == 0:
            all_args = args

        return template.format(id=self.id, args=all_args)

    def _set(self, args: List[Node]):
        self.code = self._call(self.code, args)

        return self._define()

    def _append(self, args: List[Node]):
        self.code = self._call(self.append, args)

        return self._define()

    def precompile(self, args: List[Node]):
        args: str = ", ".join(
            [arg.id for arg in args if not isinstance(arg, ContextNode)]
        )

        indented_code = []
        for i, line in enumerate(self.data.code.split("\n")):
            if i != 0:
                indented_code.append(SPACES + line)
            else:
                indented_code.append(line)

        self.data.code = "\n".join(indented_code)

        if self.protocol == "setter":
            return self._set(args)
        elif self.protocol == "append":
            return self._append(args)

