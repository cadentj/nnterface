<script lang="ts">
    import { NodeResizeControl, Position } from "@xyflow/svelte";
    import { Maximize2, GripVertical } from "lucide-svelte";
    import Handle from "@/lib/editor/flow/handle.svelte";

    let {
        label,
        children,
    } = $props();
</script>

<div class="context">
    <div 
        class="flex items-center border-b px-3 py-2 h-auto draggable"
        class:border-gradient={label == 'run' || label == 'batch'}
    >
        <GripVertical class="h-5 w-5 mr-2" />
        <small class="text-sm">{label}</small>
        {@render children?.()}
    </div>
    <NodeResizeControl minWidth={200} minHeight={150}>
        <div class="resizer">
            <Maximize2 class="h-3 w-3" />
        </div>
    </NodeResizeControl>

    <Handle type="target" position={Position.Left} label={label} />
</div>

<style>
    .draggable {
        pointer-events: all !important;

        @apply !cursor-move;
    }
</style>
