<script lang="ts">
    import { nodes, edges, defaultEdgeOptions, nodeTypes } from "./flow";
    import { SvelteFlow, SvelteFlowProvider } from "@xyflow/svelte";
    import "@xyflow/svelte/dist/base.css";
    import DragAndDropHandler from "./handlers/drag-and-drop.svelte";
    import ConnectionHandler from "./handlers/connection.svelte";
    import Layout from "./flow/layout.svelte";
    import Toolbar from "./ui/toolbar/toolbar.svelte";
    import Sidebar from "./ui/sidebar/sidebar.svelte";
    import Navbar from "./ui/navbar/navbar.svelte";
    
    import "$lib/editor/styles/flow.css";

    let dragAndDropHandler: any;
    let connectionHandler: any;
</script>

{#snippet navbar()}
    <Navbar title="Untitled" />
{/snippet}

{#snippet flow()}
    <SvelteFlow
        {nodes}
        {edges}
        {defaultEdgeOptions}
        {nodeTypes}
        fitView
        on:dragover={dragAndDropHandler.onDragOver}
        on:drop={dragAndDropHandler.onDrop}
        onconnectend={(event) => {
            connectionHandler?.handleConnectEnd();
        }}
        isValidConnection={(connection) =>
            connectionHandler.isValidConnection(connection)}
        onconnectstart={(_, params) =>
            connectionHandler.handleConnectStart(params)}
    >
        <Toolbar />
        <DragAndDropHandler bind:this={dragAndDropHandler}/>
        <ConnectionHandler bind:this={connectionHandler}/>
    </SvelteFlow>
{/snippet}

{#snippet leftSidebar()}
    <Sidebar />
{/snippet}

<SvelteFlowProvider>
    <Layout {flow} {leftSidebar} {navbar} />
</SvelteFlowProvider>

