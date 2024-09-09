import { writable, type Writable, get } from "svelte/store";

import {
    MarkerType,
    type DefaultEdgeOptions,
    type NodeTypes,
    type Node,
    type Viewport,
    useNodes,
} from "@xyflow/svelte";

import ModuleNode from "./nodes/module.svelte";
import InputNode from "./nodes/input.svelte";
import ContextNode from "./nodes/context.svelte";
import Function from "./nodes/function.svelte";

export const nodeTypes: NodeTypes = {
    module: ModuleNode,
    input: InputNode,
    context: ContextNode,
    function: Function,
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

    // const targetIndex = nodes.findIndex((node) => node.id === targetId);
    // const target = nodes[targetIndex];

    // const nextIndex = direction === "forward" ? targetIndex + 1 : targetIndex - 1;
    // const next = nodes[nextIndex];

    // nodes[targetIndex] = next;
    // nodes[nextIndex] = target;


    // return nodes;
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