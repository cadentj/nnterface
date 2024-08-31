import { writable } from "svelte/store";

import {
    MarkerType,
    type DefaultEdgeOptions,
    type NodeTypes
} from "@xyflow/svelte";

import InputNode from "./nodes/InputNode.svelte";
import LoopContext from "./nodes/LoopContext.svelte";
import FunctionContext from "./nodes/function-node/FunctionContext.svelte";
import ProtocolEdge from "./edges/ProtocolEdge.svelte";

export const nodeTypes: NodeTypes = {
    text: InputNode,
    loop: LoopContext,
    function: FunctionContext
};

export const nodes = writable([
    {
        id: "0",
        type: "text",
        data: {
            text: "hello",
        },
        position: { x: 100, y: 100 },
    },
    {
        id: "1",
        type: "default",
        data: { label: "Module" },
        position: { x: -100, y: -100 },
    },

    {
        id: "2",
        type: "function",
        data: { label: "Function" },
        position: { x: 300, y: 150 },
        style:
            "background-color: rgba(0, 128, 0, 0.5); border: 1px solid black; border-radius: 15px; font-size: 12px;",
    },

]);

export const edgeTypes = {
    protocol: ProtocolEdge,
};

export const edges = writable([
    // {
    //     id: "1-2",
    //     type: "default",
    //     source: "1",
    //     target: "2",
    //     markerEnd: {
    //         type: MarkerType.ArrowClosed,
    //     },
    // },
]);

export const defaultEdgeOptions: DefaultEdgeOptions = {
    markerEnd: {
        type: MarkerType.ArrowClosed,
    },
};