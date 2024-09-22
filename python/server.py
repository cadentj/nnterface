import logging

from fastapi import FastAPI
from nnsight import LanguageModel
import nnsight
from transformers import AutoModelForCausalLM, AutoTokenizer

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
    

    # logger.info(f"edges: {"\n".join(p)}")
    
    load("EleutherAI/pythia-14m")

    print(code, flush=True)
    loc = {}
    exec(code, None, loc)

    print(loc['graph5'], flush=True)
    
    return {"message": f"Item created: {graph}"}

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
