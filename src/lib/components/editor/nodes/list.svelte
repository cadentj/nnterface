<script lang="ts">
    import { Position, type NodeProps } from "@xyflow/svelte";

    import Handle from "../utils/handle.svelte";

    type $$Props = NodeProps;

    export let type: $$Props["type"];
    export let id: $$Props["id"];
    export let data: $$Props["data"];

    $$restProps;
</script>

<div class="block">
    {id}

    <Handle
        type="target"
        label={type}
        position={Position.Left}
        onconnect={() => {
            data.location = "input";
        }}
        ondisconnect={() => {
            data.location = "";
        }}
    />

    <Handle
        type="source"
        label={type}
        position={Position.Right}
        onconnect={() => {
            data.location = "output";
        }}
        ondisconnect={() => {
            data.location = "";
        }}
    />
</div>
