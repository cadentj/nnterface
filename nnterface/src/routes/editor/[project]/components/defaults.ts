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

import { Chat, Heatmap, Patch, Steer, Lens } from "./demos"

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
    "chat" : Chat,
    "patch" : Patch,
    "steer" : Steer,
    "heatmap" : Heatmap,
    "lens" : Lens
}

function loadProject(path: string) {
    const demo = demos[path] || {
        nodes: [],
        edges: [],
        viewport: {
            zoom: 1.2,
            x: 250,
            y: 200,
        },
    };

    return demo;
}

export function load(path: string) : {
    nodes: Writable<Node[]>,
    edges: Writable<Edge[]>,
    initialViewport: Viewport
} {
    const demo = loadProject(path);

    return {
        nodes: writable<Node[]>(demo.nodes),
        edges: writable<Edge[]>(demo.edges),
        initialViewport: demo.viewport,
    };
}

export const loadFunctions = (path: string) => {
    const demo = loadProject(path);
    const functions = demo.nodes.filter((node: Node) => node.type === "function");
    return functions.map((node: Node) => node.data);
}

export const defaultEdgeOptions: DefaultEdgeOptions = {
    markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 8,
        height: 8,
    },
    // style: "stroke-width: 3px; stroke: #fff;",
    style: 'stroke-width: 2px; stroke: #A3A3A3',
};

export const connections: Record<string, string[]> = {
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
        "function", "module", "graph", "list"
    ],
}