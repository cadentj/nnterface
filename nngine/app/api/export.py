from fastapi import APIRouter

from app.core.compile import compile
from app.core.compile.ir import Graph

router = APIRouter()

@router.post("/")
async def code(graph: Graph):
    
    code = compile(graph)
    
    return {
        "code": code
    }