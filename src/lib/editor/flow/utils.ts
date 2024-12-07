import type { Node } from "@xyflow/svelte";

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
