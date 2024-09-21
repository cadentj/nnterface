<script lang="ts">
    import { NodeResizeControl , Position} from "@xyflow/svelte";
    import { Maximize2, GripVertical } from "lucide-svelte";
    import Handle from "../utils/handle.svelte";

    export let label: string;
</script>

<div class="context border">
    <div class="flex items-center border-b px-3 py-2 h-auto draggable">
        <GripVertical class="h-5 w-5"/>
        <small class="text-sm">{label}</small>

        <slot name="title"/>
    </div>
    <NodeResizeControl minWidth={250} minHeight={200}>
        <div class="resizer">
            <Maximize2 class="h-3 w-3" />
        </div>
    </NodeResizeControl>

    <Handle label={label} type="target" position={Position.Left}/>
    <Handle label={label} type="source" position={Position.Right}/>
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
