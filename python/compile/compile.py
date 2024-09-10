from collections import defaultdict, deque
from typing import List, Dict

from .schema import Graph
from .schema.nodes import FunctionNode, InputNode, RunNode, BatchNode

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
        return topological_order, zero_degree
    else:
        raise ValueError(
            "The graph has at least one cycle and cannot be topologically sorted."
        )



def precompile(graph: Graph) -> List[str]:

    return [
        node.generate([], init=True) 
        for node in graph.nodes
        if (
            isinstance(node, InputNode)
            or isinstance(node, FunctionNode)    
        )
    ]


def compile(graph: Graph) -> tuple:
    sorted_nodes, zero_degree = topological_sort(graph)
    adj_list = get_adj_list(graph)
    nodes = {node.id: node for node in graph.nodes}

    init = precompile(graph)

    code = []

    visited = set()
    def _dfs(node_id: str, previous: str = None):
        nonlocal visited, code
        visited.add(node_id)

        line = nodes[node_id].compile([nodes[previous]]) if previous else nodes[node_id].compile([])
        code.append(line)

        for neighbor in adj_list.get(node_id, []):
            # if (neighbor not in visited):
                _dfs(neighbor, node_id)

    for node_id in zero_degree:
        if "run" in node_id:
            init.append(nodes[node_id].compile([]))
            continue
        _dfs(node_id)

    code = init + code

    return "\n".join(code), sorted_nodes
