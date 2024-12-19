import torch
from nnsight import LanguageModel
from fastapi import APIRouter

from app.schemas.load_model import LoadModelRequest
from app.state import state
from app.core.models import load_pytree

router = APIRouter()

def load_model(repo_id: str, dispatch: bool):
    model = LanguageModel(
        repo_id,
        dispatch=dispatch,
        torch_dtype=torch.bfloat16
    )
    tok = model.tokenizer

    state.model = model
    state.tok = tok
    state.repo_id = repo_id

    print("loaded model", flush=True)

@router.post("/load")
async def load(request: LoadModelRequest):
    dispatch = state.check_is_remote(request.repo_id)
    load_model(request.repo_id, dispatch=dispatch)

    pytree = load_pytree(request.repo_id)

    return {
        "pytree" : pytree
    }

@router.get("/available")
async def available():
    return {
        "local": state.local_models,
        "remote": state.remote_models
    }