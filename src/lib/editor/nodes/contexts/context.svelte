<script lang="ts">
    import { NodeResizeControl , Position, Handle} from "@xyflow/svelte";
    import { Maximize2, GripVertical } from "lucide-svelte";

    let {
        label,
        title = undefined,
        ...restProps
    } = $props();
</script>

<div class="context border">
    <div class="flex items-center border-b px-3 py-2 h-auto draggable {(label === "run") ? "border-gradient" : ""}">
        <GripVertical class="h-5 w-5 mr-2"/>
        <small class="text-sm">{label}</small>

        {@render title?.()}
    </div>
    <NodeResizeControl minWidth={250} minHeight={200}>
        <div class="resizer">
            <Maximize2 class="h-3 w-3" />
        </div>
    </NodeResizeControl>

    <Handle type="target" position={Position.Left}/>
</div>