from fastapi import APIRouter, HTTPException

from app.core.compile import Graph, compile, prepare_inputs, prepare_result
from app.state import state

router = APIRouter()


@router.post("/")
def run(graph: Graph):
    tok = state.tok

    code = compile(graph)

    loc = prepare_inputs(tok, graph, state)

    try:
        exec(code, state.globals, loc)  # code, globals, locals

        rs = prepare_result(tok, loc, graph, state.is_chat)
        return rs
    except Exception as e:
        # Raise an HTTPException with a 400 status code and the error message
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/order")
def order(graph: Graph):
    _, order = compile(graph, get_order=True)

    return {"order": order}

