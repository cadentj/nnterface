import { writable } from "svelte/store";

import {
    MarkerType,
    type DefaultEdgeOptions,
    type NodeTypes
} from "@xyflow/svelte";

import TokenNode from "./nodes/token-node/TokenNode.svelte";
import LoopContext from "./nodes/LoopContext.svelte";
import FunctionContext from "./nodes/FunctionContext.svelte";
import ProtocolEdge from "./edges/ProtocolEdge.svelte";

export const nodeTypes: NodeTypes = {
    text: TokenNode,
    loop: LoopContext,
    function: FunctionContext
};

export const nodes = writable([
    {
        id: "4",
        type: "text",
        data: {
            text: "hello",
        },
        position: { x: 100, y: 100 },
    },
    {
        id: "1",
        type: "input",
        data: { label: "Input Node" },
        position: { x: -100, y: -100 },
    },

    // {
    //     id: "2",
    //     type: "default",
    //     data: { label: "Default Node" },
    //     position: { x: 0, y: 150 },
    // },
    // {
    //     id: "3",
    //     type: "loop",
    //     data: { label: "Output Node" },
    //     position: { x: 300, y: 150 },
    //     style:
    //         "background-color: rgba(0, 128, 0, 0.5); border: 1px solid black; border-radius: 15px; font-size: 12px;",
    // },

]);

export const edgeTypes = {
    protocol: ProtocolEdge,
};

export const edges = writable([
    {
        id: "1-2",
        type: "default",
        source: "1",
        target: "2",
        markerEnd: {
            type: MarkerType.ArrowClosed,
        },
    },
    {
        id: "1-3",
        type: "protocol",
        source: "1",
        target: "3",
    },
]);

export const defaultEdgeOptions: DefaultEdgeOptions = {
    markerEnd: {
        type: MarkerType.ArrowClosed,
    },
};