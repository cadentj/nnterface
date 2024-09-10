<script lang="ts">
    import {
        Position,
        type NodeProps,
    } from "@xyflow/svelte";

    import Handle from "../utils/handle.svelte";

    type $$Props = NodeProps;

    export let data: $$Props["data"];

    $$restProps;
</script>

<div class="block">
    {data.moduleName}
    <Handle
        id="a"
        type="source"
        label={data.label}
        position={Position.Top}
        onconnect={() => {
            data.location = "input";
        }}
        ondisconnect={() => {
            data.location = "";
        }}
    />

    <Handle
        id="b"
        type="source"
        label={data.label}
        position={Position.Bottom}
        onconnect={() => {
            data.location = "output";
        }}
        ondisconnect={() => {
            data.location = "";
        }}
    />

    <Handle
        id="c"
        type="target"
        label={data.label}
        position={Position.Top}
        onconnect={() => {
            data.location = "input";
        }}
        ondisconnect={() => {
            data.location = "";
        }}
    />

    <Handle
        id="d"
        type="target"
        label={data.label}
        position={Position.Bottom}
        onconnect={() => {
            data.location = "output";
        }}
        ondisconnect={() => {
            data.location = "";
        }}
    />
</div>
