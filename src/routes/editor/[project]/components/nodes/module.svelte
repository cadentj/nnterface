<script lang="ts">
    import { Position } from "@xyflow/svelte";
    import type { ModuleNodeProps } from "$lib/components/types/nodes";

    import Handle from "../flow/handle.svelte";

    type $$Props = ModuleNodeProps;

    export let type: $$Props["type"];
    export let data: $$Props["data"];

    data.isVariable = data.moduleName.includes("<VAR>")
    // TODO: Should reimplement with dropdown menu.
    data.loopParentIds = data.loopParentIds || ["a", "b", "c", "d"];

    // Split the module name in two parts to insert the variable.
    let shortenedName = data.moduleName.includes(".")
        ? data.moduleName.split(".").at(-1)
        : data.moduleName;

    $$restProps;
</script>

<div class="node">
    {#if data.isVariable}
        {(shortenedName === "<VAR>") ? "layers" : shortenedName}
        [<input type="text" bind:value={data.variable} class="w-12" />]
    {:else}
        {shortenedName}
    {/if}

    <Handle type="target" label={type} position={Position.Left} />

    <Handle type="source" label={type} position={Position.Right} />
</div>
