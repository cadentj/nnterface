<script lang="ts">
    import {
        Handle,
        NodeResizer,
        Position,
        type NodeProps,
    } from "@xyflow/svelte";

    type $$Props = NodeProps;

    export let data: $$Props["data"] = undefined;
    export let selected: $$Props["selected"] = undefined;
</script>

<div>
    <NodeResizer
        minWidth={100}
        minHeight={30}
        isVisible={selected}
        handleStyle="border: 1px solid black; background-color: white"
    />

    <Handle type="target" position={Position.Left} />
    <div style="padding: 10px">{data.label}</div>
    <Handle type="source" position={Position.Right} />
</div>


