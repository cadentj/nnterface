<script lang="ts">
    import { Position } from "@xyflow/svelte";
    import Handle from "$lib/editor/flow/handle.svelte";
    import type { ModuleNodeProps } from "$lib/editor/types/nodes";
    import { connectionHandler } from "@/lib/editor/handlers/states.svelte";

    let {
        type,
        data,
        ...restProps
    }: ModuleNodeProps = $props();
</script>

<div class="node">
    {data.moduleName}
    <Handle type="target" position={Position.Left} label="module" />
    <Handle type="source" position={Position.Right} label="module" />
</div>