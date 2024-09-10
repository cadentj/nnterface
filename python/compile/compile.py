from collections import defaultdict, deque
from typing import List, Dict

from .schema import Graph, Edge

REPO_ID = "EleutherAI/pythia-14m"

def get_adj_list(graph: Graph, reverse: bool = False) -> dict:
    adj_list = defaultdict(list)

    for edge in graph.edges:
        if not reverse:
            adj_list[edge.source].append(edge.target)
        else:
            adj_list[edge.target].append(edge.source)

    return adj_list


def get_in_degree(graph: Graph) -> dict:
    """
    Compute the in-degree (number of incoming edges) for each node.
    """
    in_degree = {node.id: 0 for node in graph.nodes}

    for edge in graph.edges:
        in_degree[edge.target] += 1

    return in_degree


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
    zero_degree = sorted(zero_degree, key=lambda x: 0 if "input" in x else 1)

    queue = deque(zero_degree)
    print(queue, flush=True)

    topological_order = []

    while queue:
        node_id = queue.popleft()
        topological_order.append(node_id)

        for neighbor in adj_list.get(node_id, []):
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    if len(topological_order) == len(graph.nodes):
        return topological_order
    else:
        raise ValueError(
            "The graph has at least one cycle and cannot be topologically sorted."
        )


def compile(graph: Graph) -> tuple:
    sorted_nodes = topological_sort(graph)
    r_adj_list = get_adj_list(graph, reverse=True)
    nodes = {node.id: node for node in graph.nodes}

    code = []

    for node in sorted_nodes:
        input_ids = r_adj_list.get(node, [])
        print(node, input_ids, flush=True)
        # inputs = [nodes[input_node] for input_node in input_ids]
        # code.append(nodes[node].compile(inputs))

    return code, sorted_nodes