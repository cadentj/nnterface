import { writable, type Writable } from "svelte/store";

import {
    MarkerType,
    type DefaultEdgeOptions,
    type NodeTypes,
    type Node,
    type Viewport,
} from "@xyflow/svelte";

import {
    ModuleNode,
    InputNode,
    ContextNode,
    FunctionNode,
} from "./nodes";

export const nodeTypes: NodeTypes = {
    module: ModuleNode,
    input: InputNode,
    context: ContextNode,
    function: FunctionNode,
};

export const nodes: Writable<Node[]> = writable([
    {
        id: "0",
        type: "input",
        data: {
            text: "Alice and Bob went to the store.",
            label: "input"
        },
        origin: [0.0, 0.0],
        position: { x: 0, y: -300 },
    },
]);

export const moveNode = (currentId: string, direction: "forward" | "backward") => {

    nodes.update((nodes) => {
        // Find current node given id
        const currentIndex = nodes.findIndex((node) => node.id === currentId);  
        if (currentIndex === -1) {
            return nodes;
        }
        const currentNode = nodes[currentIndex];

        // Find swap location and node
        const targetIndex = direction === "forward" ? currentIndex + 1 : currentIndex - 1;
        if (targetIndex < 0 || targetIndex >= nodes.length) {
            return nodes;
        }
        const targetNode = nodes[targetIndex];

        // Swap nodes
        nodes[currentIndex] = targetNode;
        nodes[targetIndex] = currentNode;

        return nodes;
    });
    
};

export const edges = writable([]);

export const defaultEdgeOptions: DefaultEdgeOptions = {
    markerEnd: {
        type: MarkerType.ArrowClosed,
    },
};

export const initialViewport = {
    zoom: 1,
    x: 0,
    y: 0,
} satisfies Viewport;


export const connections = {
    "input" : [
        "run", "batch"
    ],
    "run" : [
        "function"
    ],
    "batch" : [
        "function"
    ],
    "module" : [
        "function", "module"
    ],
    "function" : [
        "function"
    ]
}