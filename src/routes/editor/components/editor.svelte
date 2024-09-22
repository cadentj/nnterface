<script lang="ts">
  import { SvelteFlow, useSvelteFlow, type ColorMode } from "@xyflow/svelte";
  import {
    nodeTypes,
    nodes,
    edges,
    defaultEdgeOptions,
    initialViewport,
  } from "./defaults";
  import {
    DnDHandler,
    ContextMenu,
    ConnectionHandler,
    Layout,
    FlowMenu,
  } from "./flow";
  import { updateIntersections } from "./utils";
  import Sidebar from "./sidebar/sidebar.svelte";

  import LayersTab from "./sidebar/layers-tab.svelte";
  import ChatTab from "./sidebar/chat-tab/chat-tab.svelte";

  import "@xyflow/svelte/dist/base.css";
  import "./styles.css";

  const { toObject, getIntersectingNodes } = useSvelteFlow();

  async function createItem() {
    console.log(toObject());

    const response = await fetch("/api/compile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toObject()),
    });

    const result = await response.json();
  }

  const onNodeDragStop = ({ detail: { targetNode } }) => {
    if (targetNode.type === "module") {
      const intersecting = getIntersectingNodes(targetNode, false);

      const loopParentIds = intersecting
        .filter((node) => node.type === "loop")
        .map((node) => node.id);

      targetNode.data.loopParentIds =
        loopParentIds.length > 0 ? loopParentIds : [];
    }
  };

  const updateNodeIntersections = () => {
    $nodes = updateIntersections($nodes, getIntersectingNodes);
    createItem();
  };

  let contextMenu: ContextMenu;
  let connectionHandler: ConnectionHandler;

  let colorMode: ColorMode = "dark";
  let width: number;
  let height: number;
</script>

<Layout>
  <Sidebar slot="sidebar" />

  <div
    style="height:100%;"
    bind:clientWidth={width}
    bind:clientHeight={height}
    slot="flow"
  >
    <DnDHandler>
      <ConnectionHandler bind:this={connectionHandler} />
      <SvelteFlow
        {nodes}
        {nodeTypes}
        {edges}
        {defaultEdgeOptions}
        {colorMode}
        {initialViewport}
        on:nodeclick={contextMenu.closeMenu}
        on:paneclick={contextMenu.closeMenu}
        on:nodedragstop={onNodeDragStop}
        on:nodedragstart={contextMenu.closeMenu}
        on:nodecontextmenu={contextMenu.handleContextMenu}
        onconnectend={(event) => {
          connectionHandler?.handleConnectEnd();
        }}
        isValidConnection={(connection) =>
          connectionHandler.isValidConnection(connection)}
        onconnectstart={(_, params) =>
          connectionHandler.handleConnectStart(params)}
      >
        <FlowMenu bind:colorMode compile={updateNodeIntersections} />
        <ContextMenu bind:this={contextMenu} {width} {height} />
      </SvelteFlow>
    </DnDHandler>
  </div>

  <div slot="view">
    <!-- <LayersTab /> -->
    <ChatTab />
  </div>
</Layout>

<style>
  :global(.svelte-flow__node-input) {
    border: unset; /* Remove all default styles */
  }

  :global(.svelte-flow__node.selected) {
    @apply !border-current !rounded-lg;
  }

  :global(.svelte-flow__node.selected, .svelte-flow__node:focus) {
    /* box-shadow: 6px 6px 0 1px rgba(0, 0, 0, 0.7) !important;
    background-color: #eee !important; */

    box-shadow: 0 1px 4px 1px rgba(0, 0, 0, 0.08) !important;
  }

  :global(.svelte-flow__edges) {
    z-index: 100;
  }
</style>
