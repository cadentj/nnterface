<script lang="ts">
    import { Position } from "@xyflow/svelte";
    import type { ModuleNodeProps } from "$lib/components/types/nodes";

    import Handle from "../flow/handle.svelte";

    type $$Props = ModuleNodeProps;

    export let type: $$Props["type"];
    export let data: $$Props["data"];

    
    data.isVariable = data.isVariable || false;
    // TODO: Should reimplement with dropdown menu.
    data.loopParentIds = data.loopParentIds || ["a", "b", "c", "d"];

    // Split the module name in two parts to insert the variable.
    let before: string, after: string;
    if (data.isVariable) {
        [before, after] = data.moduleName.split("<VAR>");
    }

    let value: string = "...";
    const updateValue = () => {
        data.moduleName = `${before.slice(0, -1)}[${value}]${after}`;
    };

    $$restProps;
</script>

<div class="node">
    {#if data.isVariable}
        {before}
        <input type="text" bind:value={value} class="w-12" on:input={(e) => updateValue()} />
        {after}
    {:else}
        {data.moduleName}
    {/if}

    <!-- NOTE: Targets must come before sources in html to function properly. -->

    <Handle
        id="c"
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
        id="d"
        type="target"
        label={type}
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
        id="b"
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
