<script lang="ts">
    import { Position, type NodeProps } from "@xyflow/svelte";
    import Handle from "../utils/handle.svelte";
    type $$Props = NodeProps;

    export let data: $$Props["data"];

    function calculateHandlePosition(index, total) {
        const spacing = 100 / (total + 1);
        return `${spacing * (index + 1)}%`;
    }

    $$restProps;
</script>

<div class="block !h-20">
    {data.functionName}

    {#each data.inputs as input, index}
        <Handle
            id={input}
            label="function"
            type="target"
            position={Position.Left}
            style="top: {calculateHandlePosition(index, data.inputs.length)}"
        >
            {input}
        </Handle>
    {/each}

    <Handle
        type="source"
        position={Position.Right}
        label={data.label}
    />
</div>
