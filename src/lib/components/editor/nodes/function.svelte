<script lang="ts">
    import { Handle, Position, type NodeProps } from "@xyflow/svelte";

    type $$Props = NodeProps;

    export let data: $$Props["data"];

    function calculateHandlePosition(index, total) {
        const spacing = 100 / (total + 1);
        return `${spacing * (index + 1)}%`;
    }

    $$restProps;
</script>

<div class="block">
    {data.label}

    {#each data.inputs as input, index}
        <Handle
            id={input}
            type="source"
            position={Position.Top}
            class="w-3 h-3 !bg-blue-600 rounded-full border-none"
            style="left: {calculateHandlePosition(index, data.inputs.length)}"
        >
            {input}
        </Handle>
    {/each}

    <Handle
        type="target"
        position={Position.Bottom}
        class="w-3 h-3 !bg-red-600 rounded-full border-none"
    />
</div>
