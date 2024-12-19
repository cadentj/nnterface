from typing import Any, Dict, List
import json

from transformers import AutoTokenizer

from .ir import Graph


def get_nodes(types: List[str], graph: Graph):
    return [node for node in graph.nodes if node.type in types]


def prepare_inputs(tok: AutoTokenizer, graph: Graph, state) -> Dict[str, Any]:
    loc = {}
    input_types = ["chat"]

    for node in get_nodes(input_types, graph):
        node.tokenize(tok, chat=state.is_chat)
        loc[node.id + "_content"] = node.data.tokens

    loc["remote"] = state.is_remote

    return loc


def prepare_result(
    tok: AutoTokenizer, loc: Dict[str, Any], graph: Graph, is_chat: bool
) -> Dict[str, Any]:
    results = {}
    output_types = ["graph", "chat"]

    for node in get_nodes(output_types, graph):
        node_id = node.id
        rs = loc[node_id]

        if "chat" in node_id:
            input_length = len(node.data.tokens)

            resp = tok.decode(rs[0][input_length:], skip_special_tokens=True)
            if is_chat:
                node.data.messages.append({"role": "assistant", "content": resp})

                rs = node.data.messages
            else:
                rs = resp

        results[node_id] = json.dumps(rs)

    return results
