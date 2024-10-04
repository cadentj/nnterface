<script lang="ts">
  import { SvelteFlow, type ColorMode } from "@xyflow/svelte";
  import { nodeTypes, load, defaultEdgeOptions } from "./defaults";
  import { DnDHandler, ConnectionHandler, Layout } from "./flow";
  import Toolbar from "./toolbar/toolbar.svelte";
  import Sidebar from "./sidebar/left-sidebar.svelte";
  import ChatTab from "./chat/chat-tab.svelte";
  import LayersTab from "./sidebar/layers-tab.svelte"; 
  import Navbar from "./navbar/navbar.svelte";
  import "@xyflow/svelte/dist/base.css";
  import { setContext } from "svelte";

  import ProximityProvider from "./flow/proximity-provider.svelte";
  import "./styles.css";

  export let project: string;
  const { nodes, edges,initialViewport } = load(project);

  setContext("project", project);

  let proximityProvider: ProximityProvider;
  let connectionHandler: ConnectionHandler;

  let colorMode: ColorMode = "dark";
  let chat: boolean = false;
</script>

<Layout bind:chat>
  <Navbar slot="navbar" />

  <Sidebar slot="sidebar" />

  <ProximityProvider bind:this={proximityProvider} slot="flow">
    <DnDHandler>
      <ConnectionHandler bind:this={connectionHandler} />
      <SvelteFlow
        {nodes}
        {nodeTypes}
        {edges}
        {defaultEdgeOptions}
        {colorMode}
        {initialViewport}
        on:nodedragstop={proximityProvider.onNodeDragStop}
        on:nodedrag={proximityProvider.onNodeDrag}
        onconnectend={(event) => {
          connectionHandler?.handleConnectEnd();
        }}
        isValidConnection={(connection) =>
          connectionHandler.isValidConnection(connection)}
        onconnectstart={(_, params) =>
          connectionHandler.handleConnectStart(params)}
      >
        <Toolbar bind:colorMode bind:chat/>
      </SvelteFlow>
    </DnDHandler>
  </ProximityProvider>

  <div slot="view">
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
