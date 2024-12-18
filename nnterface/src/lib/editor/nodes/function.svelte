<script lang="ts">
    import { Position, Handle } from "@xyflow/svelte";
    import type { FunctionNodeProps } from "$lib/editor/types/nodes";

    let { data }: FunctionNodeProps = $props();

    let inputs = data.inputs;
    let typedInputs = data.typedArgs;

    let totalInputs = $derived(inputs.length + Object.keys(typedInputs).length);

    function handlePos(index: number) {
        let nHandles = totalInputs;
        return ((index + 1) / (nHandles + 1)) * 100;
    }
</script>

<div class="flex items-center border-b px-3 py-2 h-auto draggable">
    <small class="text-sm">{data.functionName}</small>
</div>

<div style="height: {Math.max(totalInputs * 50, 50)}px; position: relative;">
    {#each inputs as input, index}
        <Handle
            id={input}
            type="target"
            position={Position.Left}
            class="border-t"
            style="top: {handlePos(index)}%; position: absolute;"
        >
            <div class="pl-5">
                {input}
            </div>
        </Handle>
    {/each}
    {#each Object.keys(typedInputs) as input, index}
        <div
            class="flex items-center justify-between px-3 w-full"
            style="top: {handlePos(
                index + inputs.length,
            )}%; position: absolute; line-height: .5rem; margin-top: -.20rem;"
        >
            {input.length > 5 ? input.slice(0, 5) + "..." : input}
            <input
                class="w-14 ml-3 absolute right-3 p-1"
                bind:value={typedInputs[input]}
            />
        </div>
    {/each}

    <Handle
        type="source"
        position={Position.Right}
        style="top: 50%; position: absolute;"
    />
</div>
