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
  import { Play } from "lucide-svelte";
  import "@xyflow/svelte/dist/style.css";
  import "./nodes/nodes.css";
  import { type Writable } from "svelte/store";
  import { useDnD } from "./utils";
  import Sidebar from "./sidebar.svelte";
  import * as Resizable from "$lib/components/ui/resizable";

  import { setMode } from "mode-watcher";

  import {
    nodeTypes,
    nodeManager,
    edges,
    defaultEdgeOptions,
    initialViewport,
  } from "./flow";

  const { screenToFlowPosition } = useSvelteFlow();

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

  let colorMode: ColorMode = "dark";
  setMode(colorMode);

  const toggleColorMode = () => {
    colorMode = colorMode === "dark" ? "light" : "dark";
    setMode(colorMode);
  };

</script>

<main>
  <Resizable.PaneGroup direction="horizontal">
    <Resizable.Pane>
      <Sidebar />
    </Resizable.Pane>

    <Resizable.Handle withHandle />

    <Resizable.Pane defaultSize={75}>
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
        >
          <Controls>
            <ControlButton on:click={toggleColorMode}>
              <Play style="color: green;" />  
            </ControlButton>
          </Controls>
          <Background variant={BackgroundVariant.Dots} />
        </SvelteFlow>
    </Resizable.Pane>
  </Resizable.PaneGroup>
</main>

<style>
  main {
    height: 100vh;
    display: flex;
    flex-direction: column-reverse;
  }
</style>
