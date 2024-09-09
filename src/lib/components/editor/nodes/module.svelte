<script lang="ts">
    import {
        Handle,
        Position,
        useHandleConnections,
        type NodeProps,
        useNodes,
    } from "@xyflow/svelte";

    import "../styles/nodes.css";
    import NodeMenu from "./node.svelte";

    import { moveNode } from "../flow";


    const swap = () => {
        // $nodes = moveNode($nodes, "4", "backward");
        moveNode("4", "backward");
    };

    type $$Props = NodeProps;

    export let id: $$Props["id"];
    export let data: $$Props["data"];
    export let selected: $$Props["selected"];

    // const connections = useHandleConnections({ nodeId: id, type: "target" });
    // $: isConnectable = $connections.length === 0;

    $$restProps;
</script>

<NodeMenu id={id} selected={selected} nodeType="block">
    <div>{data.label}</div>
    <Handle
        type="source"
        position={Position.Top}
        class="w-3 h-3 !bg-blue-600 rounded-full border-none"
        onconnect={() => {
            data.location = "input";
        }}
        ondisconnect={() => {
            data.location = "";
        }}
    />

    <Handle
        type="source"
        position={Position.Bottom}
        class="w-3 h-3 !bg-red-600 rounded-full border-none"
        onconnect={() => {
            data.location = "output";
        }}
        ondisconnect={() => {
            data.location = "";
        }}
    />

    <Handle
        type="target"
        position={Position.Top}
        class="w-3 h-3 !bg-blue-600 rounded-full border-none"
        onconnect={() => {
            data.location = "input";
        }}
        ondisconnect={() => {
            data.location = "";
        }}
    />

    <Handle
        type="target"
        position={Position.Bottom}
        class="w-3 h-3 !bg-red-600 rounded-full border-none"
        onconnect={() => {
            data.location = "output";
        }}
        ondisconnect={() => {
            data.location = "";
        }}
    />

</NodeMenu>
