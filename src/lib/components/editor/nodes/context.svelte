<script lang="ts">
    import { NodeResizeControl, useInternalNode } from "@xyflow/svelte";
    import { Maximize2, GripVertical } from "lucide-svelte";

    import type { ContextNodeProps } from "$lib/components/types/nodes";

    type $$Props = ContextNodeProps;

    export let id: $$Props["id"];
    export let data: $$Props["data"];   

    const internalNode = useInternalNode(id);


    data.color = data.color || "rgba(134, 25, 143, 0.3)";
    $$restProps;
</script>

<div class="context border">
    <div class="flex items-center border-b px-3 py-2 h-auto draggable">
        <GripVertical class="h-5 w-5 mr-2"/>
        <small class="text-sm">{data.label}</small>
    </div>
    <NodeResizeControl minWidth={250} minHeight={200}>
        <div class="resizer">
            <Maximize2 class="h-3 w-3" />
        </div>
    </NodeResizeControl>
</div>

<style>
    .draggable {
        pointer-events: all !important;

        @apply !cursor-move;
    }

    .resizer {
        position: absolute;
        bottom: 0;
        right: 0;

        pointer-events: all !important;

        transform: scaleX(-1);
        @apply !pb-3 !pl-3;
    }
</style>
