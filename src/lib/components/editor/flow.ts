import { writable } from "svelte/store";

import {
    MarkerType,
    type DefaultEdgeOptions,
    type NodeTypes
} from "@xyflow/svelte";

import ModuleNode from "./nodes/ModuleNode.svelte";
import InputNode from "./nodes/InputNode.svelte";
import LoopContext from "./nodes/LoopContext.svelte";
import FunctionContext from "./nodes/function-node/FunctionContext.svelte";
import RunContext from "./nodes/RunContext.svelte";

export const nodeTypes: NodeTypes = {
    module: ModuleNode,
    text: InputNode,
    loop: LoopContext,
    function: FunctionContext,
    run: RunContext,
};

export const nodes = writable([
    {
        id: "0",
        type: "text",
        data: {
            text: "hello",
        },
        position: { x: 0, y: -300 },
    },
    {
        id: "1",
        type: "default",
        data: { label: "Module" },
        position: { x: 0, y: 0 },
    },
    {
        id: "2",
        type: "function",
        data: { label: "Function" },
        position: { x: 0, y: 300 },
        style:
            "background-color: rgba(0, 128, 0, 0.5); border: 1px solid black; border-radius: 15px; font-size: 12px;",
    },

]);

export const edges = writable([
    {
        id: "0-1",
        type: "default",
        source: "0",
        target: "1",
    },
    {
        id: "1-2",
        type: "default",
        source: "1",
        target: "2",
    },
]);

export const defaultEdgeOptions: DefaultEdgeOptions = {
    markerEnd: {
        type: MarkerType.ArrowClosed,
    },
};