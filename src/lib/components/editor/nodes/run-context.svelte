<script lang="ts">
    import type{
         NodeProps,
    } from "@xyflow/svelte";

    import ContextNode from "./context-node.svelte";

    type $$Props = NodeProps;

    export let data: $$Props["data"] = undefined;
    export let selected: $$Props["selected"] = undefined;
</script>

<ContextNode selected={selected}>
    {data.label}
</ContextNode>


<style>
    .block {
        height: 3rem;
        width: 12rem;
        background-color: green;
    }
</style>