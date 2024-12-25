import torch
from nnsight import LanguageModel
from fastapi import APIRouter

from app.schemas.models import LoadModelRequest
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

gpt2_path = "/Users/caden/.cache/huggingface/hub/models--openai-community--gpt2/snapshots/607a30d783dfa663caf39e06633721c8d4cfcd7e"

@router.post("/load")
async def load(request: LoadModelRequest):
    dispatch = not state.check_is_remote(request.repo_id)

    print("OVERRIDING LOAD WITH LOCAL INSTALLATION")

    # load_model(request.repo_id, dispatch=dispatch)
    load_model(gpt2_path, dispatch=dispatch)

    # pytree = load_pytree(request.repo_id)
    pytree = load_pytree(gpt2_path)

    return {
        "pytree" : pytree
    }

@router.get("/available")
async def available():
    return {
        "local": state.local_models,
        "remote": state.remote_models
    }