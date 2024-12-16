import type { Node } from "@xyflow/svelte";
import type { Writable } from "svelte/store";

export const createEmptyNode = (name: string): Node => ({
    id: "",
    position: { x: 0, y: 0 },
    origin: [0.0, 0.0],
    type: name,
    data: {
        variant: name,
    }
});

export const clearParents = (nodes: Node[]) => {
    return nodes.map((node) => {
        node.data.parents = ["session"];
        return node;
    });
};

export function exportGraph(
    nodes: Writable<Node[]>, 
    getIntersectingNodes: any,
    toObject: any
) {
    nodes.update((nodes) => {
        nodes = clearParents(nodes);

        nodes.map((node: Node) => {
            const intersectingNodes = getIntersectingNodes(
                node,
                false,
                nodes,
            );
            if (intersectingNodes.length >= 1) {
                node.data.parents = node.data.parents.concat(
                    intersectingNodes.map((n) => n.id),
                );
            }
            return node;
        });

        return nodes;
    });

    let graphObject = toObject();

    graphObject.nodes = graphObject.nodes.filter(
        (node: Node) => node.type !== "tutorial"
    );

    return graphObject;
}