<script lang="ts">
  import {
    SvelteFlow,
    Controls,
    Background,
    BackgroundVariant,
    useSvelteFlow,
    ControlButton,
    type Node,
    type ColorMode,
  } from "@xyflow/svelte";
  import { Play, Sun, Moon, Terminal } from "lucide-svelte";
  import "@xyflow/svelte/dist/base.css";
  import { type Writable } from "svelte/store";
  import { useDnD, updateIntersections } from "./utils";
  import Sidebar from "./sidebar/sidebar.svelte";
  import Layout from "./layout.svelte";

  import { setMode } from "mode-watcher";

  import {
    nodeTypes,
    nodeManager,
    edges,
    defaultEdgeOptions,
    initialViewport,
  } from "./flow";

  const { screenToFlowPosition, toObject, getIntersectingNodes } = useSvelteFlow();

  const nodes: Writable<Node[]> = nodeManager.getNodes();

  const type = useDnD();

  const onDragOver = (event: DragEvent) => {
    event.preventDefault();

    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = "move";
    }
  };

  const onDrop = (event: DragEvent) => {
    event.preventDefault();

    if (!$type) {
      return;
    }

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    const numNodes = ($nodes.length + 3).toString();

    const newNode = {
      ...$type,
      id: numNodes,
      position: position,
      origin: [0, 0],
    } satisfies Node;

    nodeManager.addNode(newNode);
  };

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
  }

  let colorMode: ColorMode = "dark";
  setMode(colorMode);

  const toggleColorMode = () => {
    colorMode = colorMode === "dark" ? "light" : "dark";
    setMode(colorMode);
  };

  let showViewPane: boolean = false;

  const toggleViewPane = () => {
    showViewPane = !showViewPane;
  };
</script>

<Layout {showViewPane}>
  <Sidebar slot="sidebar" />

  <SvelteFlow
    {nodes}
    {nodeTypes}
    {edges}
    {defaultEdgeOptions}
    {colorMode}
    {initialViewport}
    on:dragover={onDragOver}
    on:drop={onDrop}
    fitView
    slot="flow"
  >
    <Controls>
      <ControlButton on:click={toggleColorMode}>
        {#if colorMode === "dark"}
          <Sun />
        {:else}
          <Moon />
        {/if}
      </ControlButton>
      <ControlButton on:click={toggleViewPane}>
        <Terminal />
      </ControlButton>
      <ControlButton on:click={updateNodeIntersections}>
        <Play style="color: green;" />
      </ControlButton>
    </Controls>
    <Background variant={BackgroundVariant.Dots} />
  </SvelteFlow>
  <div slot="view">Pane Three</div>
</Layout>

<style>
  :global( .svelte-flow__node-input) {
    border: unset; /* Remove all default styles */
  }

  :global( .svelte-flow__node-input.selected) {
    border: unset; /* Remove all default styles */
  }
</style>
