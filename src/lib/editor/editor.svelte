<script lang="ts">
    import { nodes, edges, defaultEdgeOptions, nodeTypes } from "./flow";
    import { SvelteFlow } from "@xyflow/svelte";
    import "@xyflow/svelte/dist/base.css";
    import DragAndDropHandler from "./contexts/drag-and-drop-handler.svelte";
    import Layout from "./flow/layout.svelte";
    import Toolbar from "./ui/toolbar/toolbar.svelte";
    import Tree from "./ui/model-selector/tree.svelte";
    import { modelSelector } from "$lib/editor/contexts/model-selector.svelte";
    
    import "$lib/editor/styles/flow.css";

    let dragAndDropHandler: any;
</script>

{#snippet flow()}
    <SvelteFlow
        {nodes}
        {edges}
        {defaultEdgeOptions}
        {nodeTypes}
        fitView
        on:dragover={dragAndDropHandler.onDragOver}
        on:drop={dragAndDropHandler.onDrop}
    >
        <Toolbar />
        <DragAndDropHandler bind:this={dragAndDropHandler}/>
    </SvelteFlow>
{/snippet}

{#snippet leftSidebar()}
    <Tree />
{/snippet}

<Layout {flow} {leftSidebar} />