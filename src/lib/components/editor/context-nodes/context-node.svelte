<script lang="ts">
    import { Position, NodeResizer, useHandleConnections } from "@xyflow/svelte";
    import "../styles/nodes.css";
    import NodeMenu from "../nodes/node.svelte";
    import Handle from "../utils/handle.svelte";
    export let id: string = "";
    export let selected: boolean = false;
    export let label: string;

    // const connections = useHandleConnections({ nodeId: id, type: "target" });
    // $: isConnectable = $connections.length === 0;

</script>

<NodeMenu id={id} nodeType={"context"}>
    <NodeResizer
        minWidth={100}
        minHeight={30}
        isVisible={selected}
        handleStyle="border: 1px solid black; background-color: white; height: 10px; width: 10px;"
    />

    <slot />

    <Handle type="target"  position={Position.Top} label={label}/>
    <Handle type="source" position={Position.Bottom} label={label}/>
</NodeMenu>