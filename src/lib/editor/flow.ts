import {
    type Node,
    type Edge,
} from "@xyflow/svelte";

import { writable, type Writable } from "svelte/store";

const nodes: Writable<Node[]> = writable([
    { id: "a", data: { label: "node a" }, position: { x: 0, y: 0 } },
    { id: "b", data: { label: "node b" }, position: { x: 0, y: 100 } },
]);

const edges: Writable<Edge[]> = writable([{ id: "e1-2", source: "a", target: "b" }]);

export { nodes, edges };