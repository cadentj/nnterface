<script lang="ts">
    import { Handle, Position, useHandleConnections, type NodeProps } from "@xyflow/svelte";

    import "../styles/nodes.css";
    import NodeMenu from "./node-menu.svelte";

    type $$Props = NodeProps;

    export let id: $$Props["id"];
    export let data: $$Props["data"];

    const connections = useHandleConnections({ nodeId: id, type: "target" });
    $: isConnectable = $connections.length === 0;

    $$restProps;
</script>

<NodeMenu {id} nodeType={"block"}>
    <div>{data.label}</div>
    <Handle
        type="target"
        position={Position.Top}
        class="w-8 !bg-blue-600 rounded-sm border-none opacity-60"
        {isConnectable}
    />

    <Handle
        type="source"
        position={Position.Bottom}
        class="w-8 !bg-red-600 rounded-sm border-none opacity-60"
    />
</NodeMenu>
