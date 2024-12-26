from collections import defaultdict, deque
from typing import List, Callable

from .ir import Graph


def get_adj_list(graph: Graph, reverse: bool = False) -> dict:
    adj_list = defaultdict(list)

    for edge in graph.edges:
        if reverse:
            adj_list[edge.target].append(edge.source)
        else:
            adj_list[edge.source].append(edge.target)

    return adj_list


def get_top_parent(
    graph: Graph, node_id: str, level: str | Callable = "session"
) -> str:
    """Get the parent id of a node at a certain depth."""
    node = graph.lookup[node_id]

    if isinstance(level, str):
        level = lambda x: x == level
    
    while not level(node.parent):
        if node.parent == "session":
            return node.id

        node = graph.lookup[node.parent]

    return node.id

def get_in_degree(graph: Graph) -> dict:
    """Compute the in-degree of each node."""
    in_degree = {node.id: 0 for node in graph.nodes}

    for edge in graph.edges:
        in_degree[edge.target] += 1

    return in_degree


def topological_sort(graph: Graph) -> List[str]:
    """Returns a list of node_ids in topologically sorted order."""
    adj_list = get_adj_list(graph)
    in_degree = get_in_degree(graph)

    zero_degree = [node_id for node_id, degree in in_degree.items() if (degree == 0)]

    queue = deque(zero_degree)

    topological_order = []
    grouped = defaultdict(list)

    while queue:
        node_id = queue.popleft()
        topological_order.append(node_id)

        node = graph.lookup[node_id]
        grouped[node.parent].append(node)

        for neighbor in adj_list.get(node_id, []):
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    if len(topological_order) == len(graph.nodes):
        return topological_order, grouped
    else:
        raise ValueError(
            "The graph has at least one cycle and cannot be topologically sorted."
        )
