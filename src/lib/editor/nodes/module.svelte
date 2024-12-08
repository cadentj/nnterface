<script lang="ts">
    import { Position, useHandleConnections, Handle } from "@xyflow/svelte";
    // import Handle from "$lib/editor/flow/handle.svelte";
    import type { ModuleNodeProps } from "$lib/editor/types/nodes";

    let { id, type, data, ...restProps }: ModuleNodeProps = $props();

    data.isVariable = data.moduleName.includes("<VAR>");
    data.variable = data.variable || "";
    data.index = data.index || "";

    // Split the module name in two parts to insert the variable.
    let shortenedName = data.moduleName.includes(".")
        ? data.moduleName.split(".").at(-1)
        : data.moduleName;


    let showIndex = $state(false);
</script>

<div class="node flex" ondblclick={() => (showIndex = !showIndex)} role="region">
    {data.moduleName}
    <!-- Source handles before target so green is visible. -->
    <Handle id="left-target" type="target" position={Position.Left}/>
    <Handle id="right-target" type="target" position={Position.Right} />

    <Handle id="right-source" type="source" position={Position.Right} class="!bg-transparent"/>
    <Handle id="left-source" type="source" position={Position.Left} class="!bg-transparent"/>
    
    <div class="flex">
        {#if data.isVariable}
            {shortenedName === "<VAR>" ? "layers" : shortenedName}
        {/if}
        {#if data.isVariable}
            <input
                class="border-dotted border rounded-md w-12 text-center"
                type="text"
                bind:value={data.variable}
            />
        {/if}
        {#if showIndex}
            <div class="border-l pl-2 ml-2">
                <input
                    class="border rounded-md w-12 text-center"
                    type="text"
                    bind:value={data.index}
                />
            </div>
        {/if}
    </div>
</div>
