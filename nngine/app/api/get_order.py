from fastapi import APIRouter

from app.core.compile import Graph, compile

router = APIRouter()


@router.post("/")
def run(graph: Graph):
    _, order = compile(graph, return_node_order=True)

    return {"order": order}
