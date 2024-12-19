<script lang="ts">
    import { Position, Handle } from "@xyflow/svelte";
    import type { ModuleNodeProps } from "$lib/editor/types/nodes";

    let { id, type, data }: ModuleNodeProps = $props();

    data.isVariable = data.moduleName.includes("<VAR>");
    data.variable = data.variable || "";
    data.index = data.index || "";

    let showIndex = $state(false);
    let variable = $state(data.variable);
    let index = $state(data.index);

    // Split the module name in two parts to insert the variable.
    let shortenedName = data.moduleName.includes(".")
        ? data.moduleName.split(".").at(-1)
        : data.moduleName;

    $effect(() => {
        data.variable = variable;
        data.index = index;
    });
</script>

<div
    class="node flex p-3 justify-center"
    ondblclick={() => (showIndex = !showIndex)}
    role="region"
>
    <div class="flex">
        {#if data.isVariable}
            {shortenedName === "<VAR>" ? "layers" : shortenedName}
        {:else}
            {shortenedName}
        {/if}
        {#if data.isVariable}
            <div class="border-l pl-2 ml-2">
                <input
                    class="border rounded-md w-12 text-center nodrag"
                    type="text"
                    bind:value={variable}
                />
            </div>
        {/if}
        {#if showIndex}
            <div class="border-l pl-2 ml-2">
                <input
                    class="border rounded-md w-12 text-center nodrag"
                    type="text"
                    bind:value={index}
                />
            </div>
        {/if}
    </div>

    <!-- Source handles before target so green is visible. -->
    <Handle id="left-target" type="target" position={Position.Left} onconnect={() => (data.location = "input")} />
    <Handle id="right-target" type="target" position={Position.Right} onconnect={() => (data.location = "output")} />

    <Handle
        id="right-source"
        type="source"
        position={Position.Right}
        class="!bg-transparent"
        onconnect={() => (data.location = "output")}
    />
    <Handle
        id="left-source"
        type="source"
        position={Position.Left}
        class="!bg-transparent"
        onconnect={() => (data.location = "input")}
    />
</div>
