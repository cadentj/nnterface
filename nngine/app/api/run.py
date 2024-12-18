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

@router.post("/order")
def order(graph: Graph):
    _, order = compile(graph, return_node_order=True)

    return {"order": order}

@router.post("/chat")
def chat(graph: Graph):
    tok = state.get_tok()

    code = compile(graph)

    loc = prepare_inputs(tok, graph)

    exec(code, state.globals, loc)  # code, globals, locals

    return prepare_result(tok, loc, graph)
