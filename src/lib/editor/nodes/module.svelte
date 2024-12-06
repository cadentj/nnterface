<script lang="ts">
    import { Position, Handle } from "@xyflow/svelte";
    import type { ModuleNodeProps } from "$lib/editor/types/nodes";

    let {
        type,
        data,
        ...restProps
    } = $props();
</script>

<div class="node">
    pee pee poopy
    <Handle type="target" position={Position.Left} />
    <Handle type="source" position={Position.Right} />
</div>