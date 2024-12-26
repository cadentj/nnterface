from typing import Tuple, List

from .ir import Graph, Node
from .parsing import precompile, prepare
from .utils import get_adj_list

# These functions are mostly the same, but im leaving them
# separate for readability.
def compile(graph: Graph, get_order: bool = False) -> Tuple[str, List[str]] | str:
    """Compile a graph into executable NNsight code."""

    # Prepare the graph for compilation.
    # grouped is just a dictionary where keys are context node ids and values 
    # are lists of the nodes within them
    sorted_nodes, grouped = prepare(graph)

    # Precompile the nodes, creating definitions and IR code.
    code = precompile(graph)

    adj_list = get_adj_list(graph)
    visited = [] # No ordered set so just a list :(

    def expand(parent_id: str, node: Node) -> None:
        """Expand the node and its children into code."""

        if node.id in visited:
            return
        
        visited.append(node.id)

        # Recurse into context node, set as new parent id
        if (node.data.variant == "context"):

            code.append(node.compile())

            for child in grouped[node.id]:
                expand(node.id, child)

        else:
            code.append(node.compile())

            for neighbor_id in adj_list[node.id]:
                neighbor = graph.lookup[neighbor_id]
                if (
                    neighbor.data.variant != "context"
                    and neighbor.parent == parent_id
                ):
                    expand(parent_id, neighbor) 

    # Expand the nodes in topological order
    for node in sorted_nodes:
        expand("session", node)

    if get_order:
        return "\n".join(code), visited
    else:
        return "\n".join(code)
