from .base import Node, NodeData
from typing import Literal, List, Dict

from transformers import AutoTokenizer

class InputData(NodeData):
    variant: Literal["input"]
    text: str


class InputNode(Node):
    type: Literal["input"]
    data: InputData

    defn: str = "{id} = '{text}'"

    def precompile(self, args: List[Node]):
        return self.defn.format(id=self.id, text=self.data.text)



class ChatData(NodeData):
    variant: Literal["chat"]

    messages: List[Dict[str, str]] | str = []
    tokens: List[int] = []

class ChatNode(Node):
    type: Literal["chat"]
    data: ChatData

    def precompile(self, args: List[Node]):
        pass

    def tokenize(self, tok: AutoTokenizer):
        self.data.tokens = tok.apply_chat_template(self.data.messages, add_generation_prompt=True)