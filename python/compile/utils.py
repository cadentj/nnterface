from collections import defaultdict

from .schema import Graph

def get_adj_list(graph: Graph, reverse: bool = False) -> dict:
    adj_list = defaultdict(list)

    for edge in graph.edges:
        if reverse:
            adj_list[edge.target].append(edge.source)
        else:
            adj_list[edge.source].append(edge.target)


    return adj_list