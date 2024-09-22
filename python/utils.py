from compile.schema import Graph


def get_output_nodes(graph: Graph):
    output_types = ["graph"]
    return [node.id for node in graph.nodes if node.type in output_types]
