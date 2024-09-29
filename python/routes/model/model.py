from fastapi import APIRouter

from .generate_pytree import load_pytree
from .schema import ModelConfigModel

router = APIRouter()

@router.post("/load-model")
async def model(model_config: ModelConfigModel):

    pytree = load_pytree(model_config.repo_id)

    return {
        "pytree" : pytree
    }