<script lang="ts">
  import {
    SvelteFlow,
    useSvelteFlow,
    type ColorMode,
  } from "@xyflow/svelte";
  import {
    nodeTypes,
    nodes,
    edges,
    defaultEdgeOptions,
    initialViewport,
  } from "./flow";
  import {
    DnDHandler,
    ContextMenu,
    ConnectionHandler,
    Layout,
    FlowMenu
  } from "./utils";
  import { updateIntersections } from "./util";
  import Sidebar from "./sidebar/sidebar.svelte";

  import "@xyflow/svelte/dist/base.css";
  import "./flow.css";

  const { toObject, getIntersectingNodes } = useSvelteFlow();

  async function createItem() {
    const response = await fetch("/api/compile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toObject()),
    });
    const result = await response.json();
    console.log(result);
  }

  const updateNodeIntersections = () => {
    $nodes = updateIntersections($nodes, getIntersectingNodes);
    createItem();
  };

  let contextMenu: ContextMenu;
  let connectionHandler: ConnectionHandler;

  let colorMode: ColorMode = "dark";
  let width: number;
  let height: number;
  let showViewPane: boolean = false;
</script>

<Layout {showViewPane}>
  <Sidebar slot="sidebar" />

  <div
    style="height:100vh;"
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
        isValidConnection={(connection) => connectionHandler?.isValidConnection?.(connection)}
        on:nodedragstart={contextMenu.closeMenu}
        on:nodeclick={contextMenu.closeMenu}
        on:nodecontextmenu={contextMenu.handleContextMenu}
        on:paneclick={contextMenu.closeMenu}
        onconnectstart={(_, params) => connectionHandler.handleConnectStart(params)}
        on:connectend={connectionHandler.handleConnectEnd}
        fitView
      >
        <FlowMenu bind:showViewPane bind:colorMode />

        <ContextMenu bind:this={contextMenu} {width} {height} />
      </SvelteFlow>
    </DnDHandler>
  </div>

  <div slot="view">Pane Three</div>
</Layout>

<style>
  :global(.svelte-flow__node-input) {
    border: unset; /* Remove all default styles */
  }

  :global(.svelte-flow__node.selected) {
    @apply border-current rounded-lg;
  }
</style>
