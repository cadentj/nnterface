import { writable } from "svelte/store";

import {
    MarkerType,
    type DefaultEdgeOptions,
    type NodeTypes,
} from "@xyflow/svelte";

import ModuleNode from "./nodes/module-node.svelte";
import InputNode from "./nodes/input-node.svelte";
import LoopContext from "./nodes/loop-context.svelte";
import FunctionContext from "./nodes/function-context/function-context.svelte";
import RunContext from "./nodes/run-context.svelte";

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