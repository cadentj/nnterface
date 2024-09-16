<script lang="ts">
    import { Position } from "@xyflow/svelte";
    import type { ModuleNodeProps } from "$lib/components/types/nodes";

    import Handle from "../utils/handle.svelte";

    type $$Props = ModuleNodeProps;

    export let data: $$Props["data"];

    data.isVariable = data.isVariable || false;
    data.loopVariable = data.loopVariable || "";
    data.loopParentIds = data.loopParentIds || [];

    $$restProps;
</script>

<div class="block">
    {data.moduleName}

    {#if data.isVariable && data.loopParentIds.length === 0}
        <span class="variable">Needs loop</span>
    {/if}

    {#if data.isVariable && data.loopVariable === ""}
        <span class="variable">Select var</span>
    {/if}

    <!-- NOTE: targets must come before sources in html to function properly. -->

    <Handle
        id="c"
        type="target"
        label={data.label}
        position={Position.Left}
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
        position={Position.Right}
        onconnect={() => {
            data.location = "output";
        }}
        ondisconnect={() => {
            data.location = "";
        }}
    />

    <Handle
        id="a"
        type="source"
        label={data.label}
        position={Position.Left}
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
        position={Position.Right}
        onconnect={() => {
            data.location = "output";
        }}
        ondisconnect={() => {
            data.location = "";
        }}
    />
</div>
