<script lang="ts">
    import { SvelteFlow, SvelteFlowProvider } from "@xyflow/svelte";
    import { defaultEdgeOptions, nodeTypes, load } from "./flow";

    import Layout from "./flow/layout.svelte";
    import Toolbar from "./ui/toolbar/toolbar.svelte";
    import Sidebar from "./ui/sidebar/sidebar.svelte";
    import ChatTab from "./ui/chat/chat-tab.svelte";
    import Navbar from "./ui/navbar/navbar.svelte";

    import DragAndDropHandler from "./handlers/drag-and-drop.svelte";
    import ConnectionHandler from "./handlers/connection.svelte";
    import ProximityHandler from "./handlers/proximity.svelte";
    
    import "@xyflow/svelte/dist/base.css";
    import "$lib/editor/styles/flow.css";

    let { project } = $props();

    let { 
        nodes, 
        edges, 
        initialViewport,
    } = load(project);

    let dragAndDropHandler: any;
    let connectionHandler: any;
    let proximityHandler: any;
</script>

{#snippet navbar()}
    <Navbar title="Untitled" />
{/snippet}

{#snippet flow()}
    <SvelteFlow
        {nodes}
        {edges}
        {initialViewport}
        {defaultEdgeOptions}
        {nodeTypes}
        on:dragover={dragAndDropHandler.onDragOver}
        on:drop={dragAndDropHandler.onDrop}
        onconnectend={() => 
            connectionHandler?.handleConnectEnd()
        }
        isValidConnection={(connection) =>
            connectionHandler.checkIsValidConnection(connection)
        }
        onconnectstart={(_, params) =>
            connectionHandler.handleConnectStart(params)
        }
        on:nodedragstop={proximityHandler.onNodeDragStop}
        on:nodedrag={(event) => {
            proximityHandler.onNodeDrag(
                event.detail,
                connectionHandler.checkIsValidConnection
            );
        }}
    >
        <Toolbar />
    </SvelteFlow>
{/snippet}

{#snippet leftSidebar()}
    <Sidebar />
{/snippet}

{#snippet chat()}
    <ChatTab />
{/snippet}

<SvelteFlowProvider>
    <Layout {flow} {leftSidebar} {navbar} {chat} />
    <DragAndDropHandler bind:this={dragAndDropHandler}/>
    <ConnectionHandler bind:this={connectionHandler}/>
    <ProximityHandler bind:this={proximityHandler}/>
</SvelteFlowProvider>
