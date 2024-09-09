<script lang="ts">
    import { Handle, Position, type NodeProps } from "@xyflow/svelte";

    import "../styles/nodes.css";
    import NodeMenu from "./node.svelte";

    type $$Props = NodeProps;

    export let id: $$Props["id"];
    export let data: $$Props["data"];
    export let selected: $$Props["selected"];

    function calculateHandlePosition(index, total) {
        const spacing = 100 / (total + 1);
        return `${spacing * (index + 1)}%`;
    }

    $$restProps;
</script>

<NodeMenu {id} {selected} nodeType="block">
    <div>{data.label}</div>

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
</NodeMenu>
