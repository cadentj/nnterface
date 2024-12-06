<script lang="ts">
    import { Position, Handle } from "@xyflow/svelte";
    import type { FunctionNodeProps } from "$lib/editor/types/nodes";

    let {
        type,
        data,
        ...restProps
    }: FunctionNodeProps = $props();

    let inputs = data.inputs;

    function handlePos(index: number) {
        let nHandles = inputs.length;
        return ((index + 1) / (nHandles + 1)) * 100;
    }
</script>

<div class="node !p-0">
    <div class="flex items-center border-b px-3 py-2 h-auto draggable">
        <small class="text-sm">{data.functionName}</small>
    </div>

    <div style="height: {inputs.length * 30}px; position: relative;">
        {#each inputs as input, index}
            <Handle
                id={input}
                type="target"
                position={Position.Left}
                style="top: {handlePos(index)}%; position: absolute;"
            >
                {input}
            </Handle>
        {/each}

        <Handle
            type="source"
            position={Position.Right}
            style="top: 50%; position: absolute;"
        />
    </div>
</div>
