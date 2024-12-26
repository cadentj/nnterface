from typing import List, Dict, Tuple

from .ir import Node, Edge, Graph
from .utils import topological_sort, get_adj_list, get_top_parent

def resolve_dependencies(graph: Graph) -> None:
    """Draw edges between context blocks to ensure dependencies are resolved correctly.

    Args:
        graph (Graph): Graph to draw the edges for.

    Returns:
        None
    """

    edges = []
    for edge in graph.edges:
        src = graph.lookup[edge.source]
        tar = graph.lookup[edge.target]

        match (len(src.data.parents), len(tar.data.parents)):
            # A connection to a node of greater depth should connect
            # to the top parent of the target node. This ensures that
            # nodes are topologically sorted correctly.
            case (x, y) if (x < y and not ("input" in src.id and "batch" in tar.id)):
                other_id = get_top_parent(graph, tar.id, level=src.parent)
                edges.append(Edge(source=src.id, target=other_id))

            # A connection to a node of equal depth within a different
            # context should resolve contexts sequentially.
            case (x, y) if (x == y and src.parent != tar.parent):
                edges.append(Edge(source=src.id, target=tar.parent))

    graph.edges.extend(edges)


def unfold_edges(graph: Graph) -> None:
    """Draw edges between nodes and their immediate parents.

    Args:
        graph (Graph): Graph to draw the edges for.

    Returns:
        None
    """

    def unfold_context(node: Node) -> None:
        # If the parents list includes the empty
        # string, this is a session node.
        if node.data.parents == [""]:
            return

        parent_id = node.data.parents[-1]
        edge = Edge(source=parent_id, target=node.id)

        if node.data.variant == "list":
            parent = graph.lookup[parent_id]
            parent.add_default(node)

        graph.edges.append(edge)

    for node in graph.nodes:
        unfold_context(node)


def fix_collections(graph: Graph):
    for edge in graph.edges:
        src = graph.lookup[edge.source]
        tar = graph.lookup[edge.target]

        if tar.data.variant == "list":
            top_id = get_top_parent(graph, src.id, lambda x: "loop" in x)
            top_node = graph.lookup[top_id]

            tar.data.parents = top_node.data.parents
            tar.parent = tar.data.parents[-1]


def prepare(graph: Graph) -> Tuple[List[Node], Dict[str, List[Node]]]:
    """Prepare the graph for compilation."""

    # Visually, collections should be defined outside of a loop.
    fix_collections(graph)

    # Draw extra edges between context blocks to ensure
    # dependencies are resolved correctly by topological sort.
    resolve_dependencies(graph)

    # Draw edges between nodes and their immediate parents.
    unfold_edges(graph)

    # Topologically sort the nodes.
    sorted_ids, grouped = topological_sort(graph)
    sorted_nodes = [graph.lookup[node_id] for node_id in sorted_ids]

    return sorted_nodes, grouped


def precompile(graph: Graph) -> List[str]:
    """Compile the initial definitions and functions, as well as create the formatted IR for each node.

    Args:
        graph (Graph): Graph to compile.
        sorted_nodes (List[Node]): Nodes to compile.

    Returns:
        List[str]: Compiled code.
    """

    r_adj_list = get_adj_list(graph, reverse=True)

    code = []

    for node in graph.nodes:
        inputs = [graph.lookup[input_id] for input_id in r_adj_list[node.id]]

        line: str | None = node.precompile(inputs)
        if line is not None:
            code.append(line)

    return code
