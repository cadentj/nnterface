<script lang="ts">
    import { Position, Handle } from "@xyflow/svelte";
    import type { ListNodeProps } from "$lib/editor/types/nodes";

    let {
        type,
        data,
    }: ListNodeProps = $props();
</script>

<div class="node p-3">
    {type}
    <Handle
        type="target"
        position={Position.Left}
        on:connect={() => {
            data.location = "input";
        }}
        on:disconnect={() => {
            data.location = "";
        }}
    />

    <Handle
        type="source"
        position={Position.Right}
        on:connect={() => {
            data.location = "output";
        }}
        on:disconnect={() => {
            data.location = "";
        }}
    />
</div>
