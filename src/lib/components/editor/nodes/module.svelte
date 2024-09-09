<script lang="ts">
    import {
        Handle,
        Position,
        type NodeProps,
    } from "@xyflow/svelte";

    type $$Props = NodeProps;

    export let data: $$Props["data"];

    $$restProps;
</script>

<div class="block">
    {data.label}
    <Handle
        type="source"
        position={Position.Top}
        class="w-3 h-3 !bg-blue-600 rounded-full border-none"
        onconnect={() => {
            data.location = "input";
        }}
        ondisconnect={() => {
            data.location = "";
        }}
    />

    <Handle
        type="source"
        position={Position.Bottom}
        class="w-3 h-3 !bg-red-600 rounded-full border-none"
        onconnect={() => {
            data.location = "output";
        }}
        ondisconnect={() => {
            data.location = "";
        }}
    />

    <Handle
        type="target"
        position={Position.Top}
        class="w-3 h-3 !bg-blue-600 rounded-full border-none"
        onconnect={() => {
            data.location = "input";
        }}
        ondisconnect={() => {
            data.location = "";
        }}
    />

    <Handle
        type="target"
        position={Position.Bottom}
        class="w-3 h-3 !bg-red-600 rounded-full border-none"
        onconnect={() => {
            data.location = "output";
        }}
        ondisconnect={() => {
            data.location = "";
        }}
    />
</div>
