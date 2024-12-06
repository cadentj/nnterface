<script lang="ts">
    import { nodes, edges, defaultEdgeOptions, nodeTypes } from "./flow";
    import { SvelteFlow, Background } from "@xyflow/svelte";
    import "@xyflow/svelte/dist/base.css";
    import DragAndDropHandler from "./contexts/drag-and-drop-handler.svelte";
    import Layout from "./flow/layout.svelte";
    import Toolbar from "./ui/toolbar/toolbar.svelte";
    import Sidebar from "./ui/sidebar/sidebar.svelte";
    
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
        <Background bgColor="#FFFFFF" />
    </SvelteFlow>
{/snippet}

{#snippet leftSidebar()}
    <Sidebar />
{/snippet}

<Layout {flow} {leftSidebar} />