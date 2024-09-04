import { writable, type Writable } from "svelte/store";

import {
    MarkerType,
    type DefaultEdgeOptions,
    type NodeTypes,
    type Node,
    type Viewport,
} from "@xyflow/svelte";

import ModuleNode from "./nodes/module-node.svelte";
import InputNode from "./nodes/input-node.svelte";
import LoopContext from "./context-nodes/loop-context.svelte";
import FunctionContext from "./context-nodes/function-context.svelte";
import RunContext from "./context-nodes/run-context.svelte";

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
        },
        origin: [0.0, 0.0],
        position: { x: 0, y: -300 },
    },
]);

class NodeManager {

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
        // add context nodes to the start of the list
        this.nodes.update((nodes) => {
            return [node, ...nodes];
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