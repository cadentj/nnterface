from .schema import Graph
from .object_code import SESSION, TRACE, INVOKE

def indent(text: str, n_indents: int = 0) -> str: 
    return f"{n_indents * "\t"}{text}"

def compile(graph: Graph) -> str: 
    pass