<script lang="ts">
    import { Position } from "@xyflow/svelte";
    import type { ModuleNodeProps } from "$lib/components/types/nodes";

    import * as Tooltip from "$lib/components/ui/tooltip";
    import Handle from "../flow/handle.svelte";
    import { DateRangeField } from "bits-ui";

    type $$Props = ModuleNodeProps;

    export let type: $$Props["type"];
    export let data: $$Props["data"];

    data.isVariable = data.moduleName.includes("<VAR>");
    data.variable = "";

    data.index = "";

    // TODO: Should reimplement with dropdown menu.
    data.loopParentIds = data.loopParentIds || ["a", "b", "c", "d"];

    let showIndex = false;

    // Split the module name in two parts to insert the variable.
    let shortenedName = data.moduleName.includes(".")
        ? data.moduleName.split(".").at(-1)
        : data.moduleName;

    $$restProps;
</script>

<!-- TODO: https://svelte.dev/repl/f0823379afef4d249358cf969519c1b8?version=4.2.19 -->
<div class="node" role="region" on:dblclick={() => showIndex = !showIndex}>
    <div class="flex">
        {#if data.isVariable}
            {shortenedName === "<VAR>" ? "layers" : shortenedName}
        {:else}
            {shortenedName}
        {/if}
        {#if data.isVariable}
            <div class="border-l pl-2 ml-2">
                <Tooltip.Root openDelay={200}>
                    <Tooltip.Trigger>
                        <input
                            class="border-dotted border rounded-md w-12 text-center"
                            type="text"
                            bind:value={data.variable}
                        />
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                        <p>Variable</p>
                    </Tooltip.Content>
                </Tooltip.Root>
            </div>
        {/if}
        {#if showIndex}
        <div class="border-l pl-2 ml-2">
            <Tooltip.Root openDelay={200}>
                <Tooltip.Trigger>
                    <input
                        class="border rounded-md w-12 text-center"
                        type="text"
                        bind:value={data.index}
                    />
                </Tooltip.Trigger>
                <Tooltip.Content>
                    <p>Index</p>
                </Tooltip.Content>
            </Tooltip.Root>
            </div>
        {/if}
    </div>

    <Handle type="target" label={type} position={Position.Left} />

    <Handle type="source" label={type} position={Position.Right} />
</div>
