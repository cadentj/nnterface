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
    <!-- <Handle
        id="input-source"
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
        id="output-source"
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
        id="input-target"
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
        id="output-target"
        type="target"
        label={data.label}
        position={Position.Bottom}
        onconnect={() => {
            data.location = "output";
        }}
        ondisconnect={() => {
            data.location = "";
        }}
    /> -->
</div>
