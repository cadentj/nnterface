<script lang="ts">
    import { Handle, Position, type NodeProps } from "@xyflow/svelte";

    type $$Props = NodeProps;

    export let data: $$Props["data"];
    export let isConnectable: $$Props["isConnectable"];

    const DEFAULT_HANDLE_STYLE = "width: 10px; height: 10px; bottom: -5px;";
</script>

<div style="background: #DDD; padding: 25px">
    <div>{data.label}</div>
    <Handle
        id="red"
        type="source"
        position={Position.Bottom}
        style="{DEFAULT_HANDLE_STYLE}; left: 40%; background: red;"
        {isConnectable}
    />
    <Handle
        id="blue"
        type="source"
        position={Position.Bottom}
        style="{DEFAULT_HANDLE_STYLE}; left: 80%; background: blue;"
        {isConnectable}
    />
</div>
