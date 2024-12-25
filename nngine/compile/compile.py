from typing import Tuple, List
from collections import defaultdict

from .ir import Graph, Node
from .parsing import precompile, prepare


def get_order(graph: Graph) -> List[str]:
    """Compile a graph into executable NNsight code."""

    # Prepare the graph for compilation.
    sorted_nodes, grouped = prepare(graph)

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
            for child in grouped[node.id]:
                expand(child)

    # Expand the nodes in topological order
    for node in sorted_nodes:
        expand(node)

    return expanded_order

# Temporary
def get_adj_list(graph: Graph) -> dict:
    adj_list = defaultdict(list)

    for edge in graph.edges:
        adj_list[edge.source].append(graph.lookup[edge.target])

    return adj_list

# These functions are mostly the same, but im leaving them
# separate for readability.
def compile(graph: Graph) -> Tuple[str, List[str]] | str:
    """Compile a graph into executable NNsight code."""

    # Prepare the graph for compilation.
    # grouped is just a dictionary where keys are context node ids and values 
    # are lists of the nodes within them
    sorted_nodes, grouped = prepare(graph)

    # Precompile the nodes, creating definitions and IR code.
    code = precompile(graph, sorted_nodes)

    adj_list = get_adj_list(graph)

    visited = set()

    def expand(parent_id: str, node: Node) -> None:
        """Expand the node and its children into code."""

        if node.id in visited:
            return

        visited.add(node.id)

        # Recurse into context node, set as new parent id
        if (node.data.variant == "context"):

            code.append(node.compile())

            for child in grouped[node.id]:
                expand(node.id, child)

        else:
            code.append(node.compile())

            for neighbor in adj_list[node.id]:
                if (
                    neighbor.data.variant != "context"
                    and neighbor.parent == parent_id
                ):
                    expand(parent_id, neighbor) 

    # Expand the nodes in topological order
    for node in sorted_nodes:
        expand("session", node)

    return "\n".join(code)
