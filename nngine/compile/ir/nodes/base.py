from pydantic import BaseModel, ConfigDict, model_validator
from pydantic.alias_generators import to_camel

from typing import List

SPACES = "  "

### BASE SCHEMA ###

class NodeData(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
    )

    parents: List[str]
    variant: str


class Node(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
    )

    id: str
    parent: str = None

    code: str = ""

    data: NodeData

    @model_validator(mode="after")
    def set_parent(self):
        self.parent = self.data.parents[-1]
        return self

    def indent(self, extra: int = 0):
        if self.data.parents != [""]:
            return SPACES * (len(self.data.parents) + extra)
        return ""

    def compile(self):
        return self.indent() + self.code

    def precompile(self, args: List["Node"]):
        raise NotImplementedError

