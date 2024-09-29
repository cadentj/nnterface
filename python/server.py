import logging

import nnsight
import torch
import json
from nnsight import LanguageModel
from fastapi import FastAPI
from transformers import AutoModelForCausalLM, AutoTokenizer

from typing import Dict, Any, List
from compile import compile, Graph
from routes import model_router

app = FastAPI()

app.include_router(model_router)

model: AutoModelForCausalLM = None
tok: AutoTokenizer = None

logger = logging.getLogger("uvicorn")

def load(repo_id: str):
    global model, tok

    model = LanguageModel(repo_id, dispatch=True, torch_dtype=torch.bfloat16)
    tok = model.tokenizer

def get_nodes(types: List[str], graph: Graph):
    return [node for node in graph.nodes if node.type in types]

def prepare_inputs(graph: Graph):
    loc = {}
    input_types = ["chat"]

    for node in get_nodes(input_types, graph):
        if "chat" in node.id:
            node.tokenize(tok)
            loc[node.id + "_content"] = node.data.tokens

    return loc

def prepare_result(loc: Dict[str, Any], graph: Graph):
    results = {}
    output_types = ["graph", "chat"]

    for node in get_nodes(output_types, graph):
        node_id = node.id
        rs = loc[node_id].value

        if "chat" in node_id:
            input_length = len(node.data.tokens)

            resp = tok.decode(rs[0][input_length:], skip_special_tokens=True)

            node.data.messages.append({"role": "assisstant", "content": resp})

            rs = node.data.messages

        results[node_id] = json.dumps(rs)

    return results  

@app.post("/code")
async def code(graph: Graph):
    
    code = compile(graph)
    
    return {
        "code": code
    }

@app.post("/run")
async def run(graph: Graph):
    
    code = compile(graph)
    
    load("Qwen/Qwen2.5-0.5B-Instruct")

    print(code, flush=True)

    loc = prepare_inputs(graph)

    exec(code, None, loc)
    
    return prepare_result(loc, graph)

@app.post("/chat")
async def chat(graph: Graph):
    
    code = compile(graph)
    
    load("Qwen/Qwen2.5-0.5B-Instruct")

    print(code, flush=True)

    loc = prepare_inputs(graph)
    
    exec(code, None, loc)
    
    return prepare_result(loc, graph)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
