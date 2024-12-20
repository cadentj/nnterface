from fastapi import APIRouter

from app.schemas.tools import TokenizeRequest
from app.state import state

router = APIRouter()


@router.post("/tokenize")
def tokenize(request: TokenizeRequest):
    tok = state.tok

    ids = tok.encode(request.text)
    tokens = tok.batch_decode(ids)
    return {
        "ids": ids,
        "tokens": tokens
    }