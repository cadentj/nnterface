<script lang="ts">
    import { Position } from "@xyflow/svelte";
    import type { ModuleNodeProps } from "$lib/components/types/nodes";

    import Handle from "../flow/handle.svelte";

    type $$Props = ModuleNodeProps;

    export let type: $$Props["type"];
    export let data: $$Props["data"];

    data.isVariable = data.moduleName.includes("<VAR>")
    data.variable = ""

    // TODO: Should reimplement with dropdown menu.
    data.loopParentIds = data.loopParentIds || ["a", "b", "c", "d"];

    // Split the module name in two parts to insert the variable.
    let shortenedName = data.moduleName.includes(".")
        ? data.moduleName.split(".").at(-1)
        : data.moduleName;

    $$restProps;
</script>

<!-- TODO: https://svelte.dev/repl/f0823379afef4d249358cf969519c1b8?version=4.2.19 -->
<div class="node" role="region">
    {#if data.isVariable}
        {(shortenedName === "<VAR>") ? "layers" : shortenedName}
        <input class='border rounded-md w-12' type="text" bind:value={data.variable} />
    {:else}
        {shortenedName}
    {/if}

    <Handle type="target" label={type} position={Position.Left} />

    <Handle type="source" label={type} position={Position.Right} />
</div>
