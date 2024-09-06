import { writable, get, type Writable } from "svelte/store";

import {
    MarkerType,
    type DefaultEdgeOptions,
    type NodeTypes,
    type Node,
    type Viewport,
} from "@xyflow/svelte";

import ModuleNode from "./nodes/module.svelte";
import InputNode from "./nodes/input.svelte";
import LoopContext from "./context-nodes/loop.svelte";
import FunctionContext from "./context-nodes/function.svelte";
import RunContext from "./context-nodes/run.svelte";

export const nodeTypes: NodeTypes = {
    module: ModuleNode,
    input: InputNode,
    loop: LoopContext,
    function: FunctionContext,
    run: RunContext,
};

const contexts: string[] = ["loop", "function", "run"];

const nodes: Writable<Node[]> = writable([
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

class NodeManager {
    private nContexts: number = 0;
    private nodes: Writable<Node[]>;

    constructor(nodes: Writable<Node[]>) {
        this.nodes = nodes;
    }

    addNode(node: Node) {
        if (node.type && contexts.includes(node.type)) { // Ensure node.type is defined
            this.addContextNode(node);
        } else {
            this.nodes.update((nodes) => {
                return [...nodes, node];
            });
        }
    }

    private addContextNode(node: Node) {
        // Increment the context count
        this.nContexts += 1;
        
        this.nodes.update((nodes) => {
            if (nodes.length === 1) {
                // If there's only one node, add the new node at the beginning
                return [node, ...nodes];
            } else {
                // Otherwise, insert the new node at position nContexts
                return [
                    ...nodes.slice(0, this.nContexts), // Elements before nContexts
                    node,                              // The new node to insert
                    ...nodes.slice(this.nContexts)     // The rest of the elements after nContexts
                ];
            }
        });
    }

    getNodes() {
        return this.nodes;
    }
}

export const nodeManager = new NodeManager(nodes);

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