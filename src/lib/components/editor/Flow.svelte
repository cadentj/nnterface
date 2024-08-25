<script lang="ts">
  import { writable } from "svelte/store";
  import {
    SvelteFlow,
    Controls,
    Background,
    BackgroundVariant,
    MiniMap,
    useSvelteFlow,
    type Node,
    type NodeTypes,
    type Viewport,
  } from "@xyflow/svelte";

  import "@xyflow/svelte/dist/style.css";
  import { useDnD } from "./utils";
  import Sidebar from "./Sidebar.svelte";
  import * as Resizable from "$lib/components/ui/resizable";

  import TokenNode from "./nodes/token-node/TokenNode.svelte";

  const nodeTypes: NodeTypes = {
    text: TokenNode,
  };

  const nodes = writable([
    {
      id: "1",
      type: "input",
      data: { label: "Input Node" },
      position: { x: 150, y: 5 },
    },
    {
      id: "2",
      type: "default",
      data: { label: "Default Node" },
      position: { x: 0, y: 150 },
    },
    {
      id: "3",
      type: "output",
      data: { label: "Output Node" },
      position: { x: 300, y: 150 },
    },
    {
      id: "4",
      type: "text",
      data: {
        text: "hello",
      },
      position: { x: -100, y: -50 },
    },
  ]);

  const edges = writable([
    {
      id: "1-2",
      type: "default",
      source: "1",
      target: "2",
    },
    {
      id: "1-3",
      type: "smoothstep",
      source: "1",
      target: "3",
    },
  ]);

  const { screenToFlowPosition } = useSvelteFlow();

  const type = useDnD();

  const onDragOver = (event: DragEvent) => {
    event.preventDefault();

    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = "move";
    }
  };

  const initialViewport = {
    zoom: 1.2,
    x: 400,
    y: 400,
  } satisfies Viewport;

  const onDrop = (event: DragEvent) => {
    event.preventDefault();

    if (!$type) {
      return;
    }

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    const newNode = {
      id: `${Math.random()}`,
      position,
      data: { label: `${$type}` }, // NOTE: This is a small change from the examples.
      origin: [0.5, 0.0],
    } satisfies Node;

    $nodes.push(newNode);
    $nodes = $nodes;
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
        {initialViewport}
        on:dragover={onDragOver}
        on:drop={onDrop}
      >
        <Controls />
        <Background variant={BackgroundVariant.Dots} />
        <MiniMap />
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
