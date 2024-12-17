from typing import Any, Dict, List
import json

from transformers import AutoTokenizer, AutoModel

from .ir import Graph

model_types = {
    "openai-community/gpt2": "base",
    "Qwen/Qwen2.5-0.5B-Instruct": "chat",
    "meta-llama/Llama-3.1-405B": "base",
}


def get_nodes(types: List[str], graph: Graph):
    return [node for node in graph.nodes if node.type in types]


def prepare_inputs(tok: AutoTokenizer, graph: Graph) -> Dict[str, Any]:
    loc = {}
    input_types = ["chat"]

    for node in get_nodes(input_types, graph):
        if "chat" in node.id:
            if model_types["openai-community/gpt2"] == "chat":
                node.tokenize(tok)
                loc[node.id + "_content"] = node.data.tokens
            else:
                encoded = tok.encode(node.data.messages)
                loc[node.id + "_content"] = encoded
                node.data.tokens = encoded

    return loc


def prepare_result(
    tok: AutoTokenizer, loc: Dict[str, Any], graph: Graph
) -> Dict[str, Any]:
    results = {}
    output_types = ["graph", "chat"]

    for node in get_nodes(output_types, graph):
        node_id = node.id
        rs = loc[node_id]

        if "chat" in node_id:
            input_length = len(node.data.tokens)

            resp = tok.decode(rs[0][input_length:], skip_special_tokens=True)
            if model_types["openai-community/gpt2"] == "chat":
                node.data.messages.append({"role": "assistant", "content": resp})

                rs = node.data.messages
            else:
                rs = resp

        results[node_id] = json.dumps(rs)

    return results
