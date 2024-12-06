<script lang="ts">
    import { Position, type NodeProps } from "@xyflow/svelte";
    import { Handle } from "@xyflow/svelte";   

    let {
        id,
        type,
        data,
    } = $props();
</script>

<div class="node">
    {type}
    <Handle
        type="target"
        position={Position.Left}
        onconnect={() => {
            data.location = "input";
        }}
        ondisconnect={() => {
            data.location = "";
        }}
    />

    <Handle
        type="source"
        position={Position.Right}
        onconnect={() => {
            data.location = "output";
        }}
        ondisconnect={() => {
            data.location = "";
        }}
    />
</div>
