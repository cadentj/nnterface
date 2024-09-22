import logging

import nnsight
from nnsight import LanguageModel
from fastapi import FastAPI
from transformers import AutoModelForCausalLM, AutoTokenizer

from utils import get_output_nodes
from compile import compile, Graph

app = FastAPI()

model: AutoModelForCausalLM = None
tok: AutoTokenizer = None

logger = logging.getLogger("uvicorn")

def load(repo_id: str):
    global model, tok
    model = LanguageModel(repo_id, dispatch=True)
    tok = model.tokenizer


@app.post("/compile")
async def create_item(graph: Graph):
    
    code = compile(graph)
    
    load("EleutherAI/pythia-14m")

    print(code, flush=True)

    loc = {}

    exec(code, None, loc)
    
    return {
        node_id : loc[node_id].value
        for node_id 
        in get_output_nodes(graph)
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
