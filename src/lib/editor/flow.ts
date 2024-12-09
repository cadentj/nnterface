import {
    type Node,
    type Edge,
    type NodeTypes,
    type DefaultEdgeOptions,
    MarkerType,
    type Viewport
} from "@xyflow/svelte";

import { writable, type Writable } from "svelte/store";
import { modelSelector, defaultFunctions } from "@/lib/editor/handlers/states.svelte";
import {
    ModuleNode,
    BatchNode,
    LoopNode,
    RunNode,
    FunctionNode,
    GraphNode,
    InputNode,
    ListNode,
    ChatNode,
    TutorialNode,
} from "$lib/editor/nodes";

const nodeTypes: NodeTypes = {
    module: ModuleNode,
    batch: BatchNode,
    loop: LoopNode,
    run: RunNode,
    function: FunctionNode,
    graph: GraphNode,
    input: InputNode,
    list: ListNode,
    chat: ChatNode,
    tutorial: TutorialNode,
};

export function load(project: any) : {
    nodes: Writable<Node[]>,
    edges: Writable<Edge[]>,
    initialViewport: Viewport,
} {
    modelSelector.modelId = project.modelId ? project.modelId : "none";

    defaultFunctions.push(...loadFunctions(project));

    return {
        nodes: writable<Node[]>(project.nodes),
        edges: writable<Edge[]>(project.edges),
        initialViewport: project.viewport,
    };
}

export const loadFunctions = (project: any) => {
    const functions = project.nodes.filter(
        (node: Node) => node.type === "function"
    );
    return functions.map((node: Node) => node.data);
}

const defaultEdgeOptions: DefaultEdgeOptions = {
    markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 8,
        height: 8,
    },
    style: 'stroke-width: 2px; stroke: #A3A3A3',
};

export { nodeTypes, defaultEdgeOptions };