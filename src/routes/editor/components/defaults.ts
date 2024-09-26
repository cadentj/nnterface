import { writable, type Writable } from "svelte/store";

import {
    MarkerType,
    type DefaultEdgeOptions,
    type NodeTypes,
    type Node,
    type Viewport,
    type Edge,
} from "@xyflow/svelte";

import {
    ModuleNode,
    InputNode,
    FunctionNode,
    ListNode,
    ChatNode,
    GraphNode,
    LoopNode,
    RunNode,
    BatchNode
} from "./nodes";

import { Chat } from "./demos"

export const nodeTypes: NodeTypes = {
    module: ModuleNode,
    input: InputNode,
    function: FunctionNode,
    list: ListNode,
    chat: ChatNode,
    graph: GraphNode,
    loop: LoopNode,
    batch: BatchNode,
    run: RunNode,
};

const demos = {
    "chat" : Chat
}

export function load(path: string) {
    const demo = demos[path] || {
        nodes: [],
        edges: [],
        viewport: {
            zoom: 1.2,
            x: 250,
            y: 200,
        },
    };

    return {
        nodes: writable<Node[]>(demo.nodes),
        edges: writable<Edge[]>(demo.edges),
        initialViewport: demo.viewport,
    };
}

export const defaultEdgeOptions: DefaultEdgeOptions = {
    markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 8,
        height: 8,
    },
    style: "stroke-width: 3px"
};

export const connections = {
    "input": [
        "run", "batch"
    ],
    "chat": [
        "run", "batch"
    ],
    "module": [
        "function", "module", "list"
    ],
    "function": [
        "function", "module", "run", "list"
    ],
    "list": [
        "function", "module", "graph"
    ],
}