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

    import { editor, chat } from "./handlers/states.svelte";

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
                chat.isVisible = false;
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
    <Sidebar />
{/snippet}

{#snippet chatTab()}
    <ChatTab />
{/snippet}

<SvelteFlowProvider>
    <Layout {flow} {leftSidebar} {navbar} {chatTab} />
    <DragAndDropHandler bind:this={dragAndDropHandler}/>
    <ConnectionHandler bind:this={connectionHandler}/>
    <ProximityHandler bind:this={proximityHandler}/>
</SvelteFlowProvider>