<script lang="ts">
    import { Position, Handle } from "@xyflow/svelte";
    import type { FunctionNodeProps } from "$lib/editor/types/nodes";

    let { data }: FunctionNodeProps = $props();

    let inputs = data.inputs;
    let typedInputs = $state(data.typedArgs);

    $effect(() => {
        data.typedArgs = typedInputs;
    }); 
</script>

<div class="node">
    <div class="flex items-center border-b px-3 py-2 h-auto draggable">
        <small class="text-sm">{data.functionName}</small>
    </div>
    
    <div class="flex flex-col gap-2 py-2 relative">
        {#each inputs as input, index}
            <div class="flex items-center relative h-7">
                <Handle
                    id={input}
                    type="target"
                    position={Position.Left}
                    class="border-t"
                >
                    <span class="pl-5">
                        {input}
                    </span>
                </Handle>
            </div>
        {/each}

        {#each Object.keys($state.snapshot(typedInputs)) as input, index}
            <div class="flex items-center justify-between px-3 h-7 relative">
                <span>
                    {input.length > 5 ? input.slice(0, 5) + "..." : input}
                </span>
                <input
                    class="w-14 ml-3 nodrag"
                    bind:value={typedInputs[input]}
                />
            </div>
        {/each}
    
        <Handle
            type="source"
            position={Position.Right}
            class="!absolute !top-1/2"
        />
    </div>
</div>
