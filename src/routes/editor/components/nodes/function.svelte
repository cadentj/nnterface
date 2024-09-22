<script lang="ts">
    import { Position } from "@xyflow/svelte";
    import type { FunctionNodeProps } from "$lib/components/types/nodes";
    import Handle from "../flow/handle.svelte";
    import { onMount } from "svelte";

    type $$Props = FunctionNodeProps;

    export let type: $$Props["type"];
    export let data: $$Props["data"];

    let inputs = data.inputs;

    function handlePos(index: number) {
        let nHandles = inputs.length;
        return ((index + 1) / (nHandles + 1)) * 100;
    }

    $$restProps;
</script>

<div class="block">
    <div class="flex items-center border-b px-3 py-2 h-auto draggable">
        <small class="text-sm">{data.functionName}</small>
    </div>

    <div style="height: {inputs.length * 30}px; position: relative;">
        {#each inputs as input, index}
            <Handle
                id={input}
                label="function"
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
            label={data.type}
            style="top: 50%; position: absolute;"
        />
    </div>
</div>
