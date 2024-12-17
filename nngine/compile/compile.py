from typing import Tuple, List

from .ir import Graph, Node
from .parsing import precompile, prepare


def compile(
    graph: Graph, return_node_order: bool = False
) -> Tuple[str, List[str]] | str:
    """Compile a graph into executable NNsight code."""

    # Prepare the graph for compilation.
    sorted_nodes, grouped = prepare(graph)

    # Precompile the nodes, creating definitions and IR code.
    code = precompile(graph, sorted_nodes)

    visited = set()
    expanded_order = []

    def expand(node: Node) -> None:
        """Expand the node and its children into code."""
        if node.id in visited:
            return
        else:
            expanded_order.append(node.id)

        visited.add(node.id)

        # Only recurse into context nodes
        if node.data.variant == "context":
            code.append(node.compile())

            for child in grouped[node.id]:
                expand(child)

        else:
            code.append(node.compile())

    # Expand the nodes in topological order
    for node in sorted_nodes:
        expand(node)

    if return_node_order:
        return "\n".join(code), expanded_order
    else:
        return "\n".join(code)
