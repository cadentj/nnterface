<script lang="ts">
    import { Position, type NodeProps, NodeResizer } from "@xyflow/svelte";
    import Handle from "../utils/handle.svelte";

    type $$Props = NodeProps;

    export let data: $$Props["data"];
    export let selected: $$Props["selected"];

    $$restProps;
</script>

<div class="context">
    <NodeResizer
        minWidth={100}
        minHeight={30}
        isVisible={selected}
        handleStyle="border: 1px solid black; background-color: white; height: 10px; width: 10px;"
    />

    {data.label}

    <Handle type="target" position={Position.Top} label={data.label} />
    <Handle type="source" position={Position.Bottom} label={data.label} />
</div>
