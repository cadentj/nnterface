<script lang="ts">
    import { Handle, Position, type NodeProps } from "@xyflow/svelte";

    type $$Props = NodeProps;

    export let data: $$Props["data"];
    export let isConnectable: $$Props["isConnectable"];

    const DEFAULT_HANDLE_STYLE = "width: 10px; height: 10px; bottom: -5px;";
</script>

<div class="block">
    <div>{data.label}</div>
    <Handle
        id="red"    
        type="target"
        position={Position.Top}
        style="{DEFAULT_HANDLE_STYLE}; background: red;"
        {isConnectable}
    />
    <Handle
        id="blue"
        type="source"
        position={Position.Bottom}
        style="{DEFAULT_HANDLE_STYLE}; background: blue;"
        {isConnectable}
    />
</div>

<style>
    .block {
        height: 30px;
        width: 100px;
        background-color: hsl(var(--node-background));
        border-radius: var(--radius);
    }
</style>