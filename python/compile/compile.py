from collections import defaultdict, deque, OrderedDict
from typing import List

from .schema import Graph

REPO_ID = "EleutherAI/pythia-14m"

def get_adj_list(graph: Graph, reverse: bool = False) -> dict:
    adj_list = defaultdict(list)

    for edge in graph.edges:
        if reverse:
            adj_list[edge.target].append(edge.source)
        else:
            adj_list[edge.source].append(edge.target)

    return adj_list


def get_in_degree(graph: Graph) -> dict:
    """
    Compute the in-degree (number of incoming edges) for each node.
    """
    in_degree = {node.id: 0 for node in graph.nodes}

    for edge in graph.edges:
        in_degree[edge.target] += 1

    return in_degree

def build_dependency_graph(graph: Graph) -> dict:    

    deps = defaultdict(list)

    for edge in graph.edges: 
        src = edge.source
        tar = graph.lookup[edge.target]

        if tar.parent == src:
            deps[src].append(tar.id)

    return deps


def topological_sort(graph: Graph) -> List[str]:
    """
    Perform topological sort on the graph using Kahn's algorithm.
    Returns a list of nodes in topologically sorted order.
    """
    adj_list = get_adj_list(graph)
    in_degree = get_in_degree(graph)

    zero_degree = [
        node_id 
        for node_id, degree 
        in in_degree.items()
        if (degree == 0)
    ]

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


def _to_names(list_of_ids: List[str], lookup: dict) -> List[str]:
    names = []

    for node_id in list_of_ids:
        node = lookup[node_id]
        if node.type == "function":
            names.append(node.data.function_name)
        elif node.type == "module":
            names.append(node.data.module_name)
        else:
            names.append(node.id)

    return names

def compile(graph: Graph) -> tuple:
    sorted_nodes, grouped = topological_sort(graph)

    sorted_nodes = [graph.lookup[node_id] for node_id in sorted_nodes]

    code = graph.precompile(get_adj_list(graph, reverse=True))

    visited = set()
    
    def expand(node): 
        if node.id in visited:
            return

        visited.add(node.id)

        if node.type == "context":
            code.append(node.compile())

            for child in grouped[node.id]:
                expand(child)
        else:
            code.append(node.compile())

    for node in sorted_nodes: 
        expand(node)

    print("\n".join(code), flush=True)

    return "SUCCESS"



