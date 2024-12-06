import {
    type Node,
    type Edge,
    type NodeTypes,
    type DefaultEdgeOptions,
    MarkerType,
} from "@xyflow/svelte";

import { writable, type Writable } from "svelte/store";
import { ModuleNode } from "$lib/editor/nodes";

const nodeTypes: NodeTypes = {
    module: ModuleNode,
};

const nodes: Writable<Node[]> = writable([]);

const edges: Writable<Edge[]> = writable([]);

const defaultEdgeOptions: DefaultEdgeOptions = {
    markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 8,
        height: 8,
    },
    style: 'stroke-width: 2px; stroke: #A3A3A3',
};

export { nodeTypes, nodes, edges, defaultEdgeOptions };