from .ir import Graph
from .parsing import precompile, prepare
from .utils import get_adj_list, topological_sort

def compile(graph: Graph, return_node_order: bool = False) -> tuple:
    """Compile a graph into executable NNsight code."""
    
    # NOTE: Should move this out of here.
    
    prepare(graph)
    sorted_ids, grouped = topological_sort(graph)
    sorted_nodes = [graph.lookup[node_id] for node_id in sorted_ids]

    code = precompile(graph, sorted_nodes, get_adj_list(graph, reverse=True))

    visited = set()

    expanded_order = [] 

    def expand(node):
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
