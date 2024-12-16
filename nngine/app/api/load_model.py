import torch
from nnsight import LanguageModel
from fastapi import APIRouter

from app.schemas.load_model import LoadModelRequest
from app.state import state
from app.core.models import load_pytree

router = APIRouter()

def load_model(repo_id: str):
    model = LanguageModel(
        repo_id,
        dispatch=True,
        torch_dtype=torch.bfloat16
    )
    tok = model.tokenizer

    state.set_model(model)
    state.set_tok(tok)

    print("loaded model", flush=True)

@router.post("/")
async def load(request: LoadModelRequest):

    if "405" not in request.repo_id:
        load_model(request.repo_id)

    pytree = load_pytree(request.repo_id)

    return {
        "pytree" : pytree
    }