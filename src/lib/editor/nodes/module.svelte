<script lang="ts">
    import { Position, useHandleConnections } from "@xyflow/svelte";
    import Handle from "$lib/editor/flow/handle.svelte";
    import type { ModuleNodeProps } from "$lib/editor/types/nodes";

    let { id, type, data, ...restProps }: ModuleNodeProps = $props();

    data.isVariable = data.moduleName.includes("<VAR>");
    data.variable = data.variable || "";
    data.index = data.index || "";

    // Split the module name in two parts to insert the variable.
    let shortenedName = data.moduleName.includes(".")
        ? data.moduleName.split(".").at(-1)
        : data.moduleName;

    // const targetConnections = useHandleConnections({ nodeId: id, type: 'target' });
    const targetLeftConnections = useHandleConnections({ nodeId: id, type: 'target', id: 'left-target'});
    const targetRightConnections = useHandleConnections({ nodeId: id, type: 'target', id: 'right-target'});

    function isValidConnection(connection) {
        return $targetLeftConnections.length === 0 && $targetRightConnections.length === 0;
    }

    let showIndex = $state(false);
</script>

<div class="node flex" ondblclick={() => (showIndex = !showIndex)} role="region">
    {data.moduleName}
    <!-- Source handles before target so green is visible. -->
    <Handle id="right-source" isValidConnection={isValidConnection} type="source" position={Position.Right} label="module" />
    <Handle id="left-source" isValidConnection={isValidConnection} type="source" position={Position.Left} label="module" />

    <Handle id="left-target" isValidConnection={isValidConnection} type="target" position={Position.Left} label="module" />
    <Handle id="right-target" isValidConnection={isValidConnection} type="target" position={Position.Right} label="module" />
    
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
