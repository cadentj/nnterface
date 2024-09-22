import logging

import nnsight
from nnsight import LanguageModel
from fastapi import FastAPI
from transformers import AutoModelForCausalLM, AutoTokenizer

import sys
from io import StringIO
from contextlib import contextmanager

from utils import get_output_nodes
from compile import compile, Graph

@contextmanager
def capture_stdout():
    original_stdout = sys.stdout
    try:
        string_io = StringIO()
        sys.stdout = string_io
        yield string_io
    finally:
        sys.stdout = original_stdout



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
    with capture_stdout() as captured:
        exec(code, None, loc)
    
    return {
        node_id : str(loc[node_id].value)
        for node_id 
        in get_output_nodes(graph)
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
