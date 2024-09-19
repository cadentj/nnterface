<script lang="ts">
    import { Position } from "@xyflow/svelte";
    import type { FunctionNodeProps } from "$lib/components/types/nodes";
    import Handle from "../utils/handle.svelte";
    import { onMount } from "svelte";

    type $$Props = FunctionNodeProps;

    export let id: $$Props["id"];
    export let data: $$Props["data"];

    let inputs = data.inputs;
    let handlePositions: number[];
    let sourcePosition: number;

    let blockBody = `height: ${inputs.length * 2}rem;`;

    function calculateHandlePosition(
        nHandles: number,
        blockHeight: number,
        titleHeight: number,
    ) {
        let offsetHeight = blockHeight - titleHeight;

        let handlePositions = Array.from({ length: nHandles }, (_, index) => {
            return (index + 1) * (offsetHeight / (nHandles + 1)) + titleHeight;
        });

        return handlePositions;
    }

    onMount(() => {
        const blockTitleHeight = document.getElementById(id)?.offsetHeight;
        const blockHeight = document.getElementById(
            id + "-title",
        )?.offsetHeight;

        if (blockTitleHeight && blockHeight) {
            handlePositions = calculateHandlePosition(
                inputs.length,
                blockHeight,
                blockTitleHeight,
            );

            sourcePosition =
                (blockHeight - blockTitleHeight) / 2 + blockTitleHeight;
        }
    });

    $$restProps;
</script>

<div class="block" {id}>
    <div
        class="flex items-center border-b px-3 py-2 h-auto draggable"
        id={id + "-title"}
    >
        <small class="text-sm">{data.functionName}</small>
    </div>

    <div style={blockBody}>
        {#each inputs as input, index}
            <Handle
                id={input}
                label="function"
                type="target"
                position={Position.Left}
                style="top: {handlePositions[index]}px;"
            >
                {input}
            </Handle>
        {/each}
    </div>

    <Handle
        type="source"
        position={Position.Right}
        label={data.label}
        style="top: {sourcePosition}px;"
    />
</div>
