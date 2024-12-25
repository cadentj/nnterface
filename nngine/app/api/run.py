from fastapi import APIRouter

from app.core.compile import Graph, compile, get_order, prepare_inputs, prepare_result
from app.state import state

router = APIRouter()


@router.post("/")
def run(graph: Graph):
    tok = state.tok

    code = compile(graph)

    loc = prepare_inputs(tok, graph, state)

    exec(code, state.globals, loc)  # code, globals, locals

    return prepare_result(tok, loc, graph, state.is_chat)

@router.post("/order")
def order(graph: Graph):
    order = get_order(graph)

    return {"order": order}

@router.post("/chat")
def chat(graph: Graph):
    tok = state.tok

    code = compile(graph)

    loc = prepare_inputs(tok, graph, state)

    exec(code, state.globals, loc)  # code, globals, locals

    return prepare_result(tok, loc, graph, state.is_chat)

