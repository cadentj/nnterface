from fastapi import FastAPI
from nnsight import LanguageModel
from transformers import AutoModelForCausalLM, AutoTokenizer

from compile import compile, Graph
from logger import load_logger

app = FastAPI()

model: AutoModelForCausalLM = None
tok: AutoTokenizer = None

logger = load_logger()

def load(repo_id: str):
    global model, tok
    model = LanguageModel(repo_id, dispatch=True)
    tok = model.tokenizer

@app.post("/compile")
async def create_item(graph: Graph):
    logger.info(f"Compiling graph: {graph}")
    return {"message": f"Item created: {graph}"}

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
