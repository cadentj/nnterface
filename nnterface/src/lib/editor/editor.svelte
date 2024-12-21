<script lang="ts">
    import { SvelteFlow, SvelteFlowProvider } from "@xyflow/svelte";
    import { defaultEdgeOptions, nodeTypes, load } from "./flow";

    import Layout from "./flow/layout.svelte";
    import Toolbar from "./ui/toolbar/toolbar.svelte";
    import LeftSidebar from "./ui/left-sidebar/left-sidebar.svelte";
    import RightSidebar from "./ui/right-sidebar/right-sidebar.svelte";
    import Navbar from "./ui/navbar/navbar.svelte";

    import DragAndDropHandler from "./handlers/drag-and-drop.svelte";
    import ConnectionHandler from "./handlers/connection.svelte";
    import ProximityHandler from "./handlers/proximity.svelte";
    
    import "@xyflow/svelte/dist/base.css";
    import "$lib/editor/styles/flow.css";

    import { editor } from "./handlers/states.svelte";

    let { project } = $props();

    let { 
        nodes, 
        edges, 
        initialViewport, // Ignore initial viewport, using fit view. 
    } = load(project);

    let dragAndDropHandler: any;
    let connectionHandler: any;
    let proximityHandler: any;
</script>

<svelte:head>
    <title>NNterface</title>
</svelte:head>

{#snippet navbar()}
    <Navbar title={project.name === "new" ? "Untitled" : project.name} />
{/snippet}

{#snippet flow()}
    <SvelteFlow
        {nodes}
        {edges}
        fitView={true}
        snapGrid={editor.snapGrid}
        {defaultEdgeOptions}
        {nodeTypes}
        ondelete={({nodes, edges}) => {
            const hasChatNode = nodes.some(node => node.id.includes('chat'));
            if (hasChatNode) {
                editor.chatNodeExists = false;
                editor.rightSidebarVisible = false;
            }
        }}
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
    <LeftSidebar />
{/snippet}

{#snippet rightSidebar()}
    <RightSidebar />
{/snippet}

<SvelteFlowProvider>
    <Layout {flow} {leftSidebar} {navbar} {rightSidebar} />
    <DragAndDropHandler bind:this={dragAndDropHandler}/>
    <ConnectionHandler bind:this={connectionHandler}/>
    <ProximityHandler bind:this={proximityHandler}/>
</SvelteFlowProvider>