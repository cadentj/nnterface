import logging

from fastapi import FastAPI
from nnsight import LanguageModel
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

def run(code: str): 
    global model
    exec(code)


@app.post("/compile")
async def create_item(graph: Graph):

    compiled, sorted_nodes = compile(graph)
    # code = "\n".join(compiled)


    # p = [f"{edge.source},{edge.target}" for edge in sorted_nodes]
    # logger.info(f"edges: {"\n".join(p)}")
    

    # load("EleutherAI/pythia-14m")
    # run(code)
    
    return {"message": f"Item created: {graph}"}

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
