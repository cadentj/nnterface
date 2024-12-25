from typing import List, Dict, Tuple
from collections import defaultdict

from .ir import Node, Edge, Graph
from .utils import topological_sort, get_adj_list


def build_neighbors(graph: Graph) -> Dict[str, List[Edge]]:
    """Build a lookup of node_ids to outgoing edges.

    Args:
        graph (Graph): Graph to build the lookup for.

    Returns:
        Dict[str, List[Edge]]: Lookup of node_ids to outgoing edges.
    """
    neighbors = defaultdict(list)

    for edge in graph.edges:
        neighbors[edge.source].append(edge)

    return neighbors


def get_top_parent(graph: Graph, node_id: str, level: str = "session") -> str:
    """Get the parent id of a node at a certain depth."""
    node = graph.lookup[node_id]

    while node.parent != level:
        if node.parent == "session":
            return node.id

        node = graph.lookup[node.parent]

    return node.id


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
                other = get_top_parent(graph, tar.id, level=src.parent)
                edges.append(Edge(source=src.id, target=other))

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

        print(edge)
        graph.edges.append(edge)

    for node in graph.nodes:
        unfold_context(node)


def resolve_edges(graph: Graph, sorted_nodes: List[Node]) -> None:
    """Resolve the protocol of nodes based on their immediate connections.

    Certain nodes need to know about their specific protocol, dependent
    on their immediate connections. Loop through nodes and their neighbors,
    then resolve their protocol.

    Args:
        graph (Graph): Graph to resolve the protocols for.
        sorted_nodes (List[Node]): Nodes to resolve the protocols for.

    Returns:
        None
    """

    neighbors = build_neighbors(graph)

    for node in sorted_nodes:
        for edge in neighbors.get(node.id, []):
            src = graph.lookup[edge.source]
            tar = graph.lookup[edge.target]

            match (src.data.variant, tar.data.variant):
                case ("module", ("module" | "function")):
                    src.protocol("getter")
                    tar.protocol("setter")

                case ("function", "module"):
                    tar.protocol("setter")

                case ("module", "list"):
                    src.protocol("getter")

                case ("function", "list"):
                    src.protocol("setter") # Fix naming here

                case ("context", "list"):
                    src.add_default(tar)

            # Temporary
            if tar.data.variant == "function" and edge.target_handle is not None:
                tar.handle_dict[edge.target_handle] = src.id

def fix_collections(graph: Graph): 

    for edge in graph.edges:
        src = graph.lookup[edge.source]
        tar = graph.lookup[edge.target]

        if tar.data.variant == "list":
            tar.data.parents = src.data.parents
            tar.parent = tar.data.parents[-1]


def prepare(graph: Graph) -> Tuple[List[Node], Dict[str, List[Node]]]:
    """Prepare the graph for compilation."""

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


def precompile(graph: Graph, sorted_nodes: List[Node]) -> List[str]:
    """Compile the initial definitions and functions, as well as create the formatted IR for each node.
    
    Args:
        graph (Graph): Graph to compile.
        sorted_nodes (List[Node]): Nodes to compile.

    Returns:
        List[str]: Compiled code.
    """

    r_adj_list = get_adj_list(graph, reverse=True)

    resolve_edges(graph, sorted_nodes)

    code = []

    for node in graph.nodes:
        inputs = [graph.lookup[input_id] for input_id in r_adj_list[node.id]]

        line: str | None = node.precompile(inputs)
        if line is not None:
            code.append(line)

    return code
