<script lang="ts">
    import { Position } from "@xyflow/svelte";
    import Handle from "@/lib/editor/flow/handle.svelte";
    import type { ListNodeProps } from "$lib/editor/types/nodes";

    let {
        type,
        data,
        ...restProps
    }: ListNodeProps = $props();
</script>

<div class="node">
    {type}
    <Handle
        type="target"
        label="list"
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
        label="list"
        position={Position.Right}
        on:connect={() => {
            data.location = "output";
        }}
        on:disconnect={() => {
            data.location = "";
        }}
    />
</div>
