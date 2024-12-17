from fastapi import APIRouter

from app.core.compile import Graph, compile, prepare_inputs, prepare_result
from app.state import state

router = APIRouter()


@router.post("/")
def run(graph: Graph):
    tok = state.get_tok()

    code = compile(graph)

    loc = prepare_inputs(tok, graph)

    exec(code, state.globals, loc)  # code, globals, locals

    return prepare_result(tok, loc, graph)
