from typing import Literal, List, Dict

from transformers import AutoTokenizer

from .base import Node, NodeData


class InputData(NodeData):
    """Data for the input node.

    Attributes:
        variant (Literal["input"]): Type of the node.
        text (str): Text to be passed to the model.
    """

    variant: Literal["input"]
    text: str


class InputNode(Node):
    """Input node representing some input text string. Typically connected
    to a run or batch node.

    Attributes:
        defn (str): Code for the input node. Just defines a string.
    """

    type: Literal["input"]
    data: InputData

    defn: str = "{id} = '{text}'"

    def precompile(self, args: List[Node]) -> str:
        return self.defn.format(id=self.id, text=self.data.text)


class ChatData(NodeData):
    """Data for the chat node.

    Attributes:
        variant (Literal["chat"]): Type of the node.
        messages (List[Dict[str, str]] | str): Messages to be passed to the model.
            Type depends on whether the model is base or chat model.
        tokens (List[int]): Tokens for the messages.
    """

    variant: Literal["chat"]
    messages: List[Dict[str, str]] | str = []
    tokens: List[int] = []

    temperature: float = 0.0
    max_new_tokens: int = 10


class ChatNode(Node):
    """Chat node representing some input text string. Typically connected
    to a run or batch node.
    """

    type: Literal["chat"]
    data: ChatData

    def precompile(self, args: List[Node]) -> str:
        pass

    def tokenize(self, tok: AutoTokenizer, chat: bool = True) -> None:
        if chat:
            self.data.tokens = tok.apply_chat_template(
                self.data.messages, add_generation_prompt=True
            )
        else:
            self.data.tokens = tok.encode(self.data.messages)
