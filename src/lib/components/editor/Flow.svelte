<script lang="ts">
  import {
    SvelteFlow,
    Controls,
    Background,
    BackgroundVariant,
    MiniMap,
    useSvelteFlow,
    type Node,
    type XYPosition,
    type Viewport,
  } from "@xyflow/svelte";

  import "@xyflow/svelte/dist/style.css";
  import { useDnD } from "./utils";
  import Sidebar from "./Sidebar.svelte";
  import * as Resizable from "$lib/components/ui/resizable";

  import {
    nodeTypes,
    nodes,
    edgeTypes,
    edges,
    defaultEdgeOptions,
  } from "./flow";

  const { screenToFlowPosition, getIntersectingNodes, toObject, getNode } =
    useSvelteFlow();


  function onNodeDragStop({ detail: { targetNode } }) {
    const intersections = getIntersectingNodes(targetNode, false).map(
      (n) => n.id,
    );

    $nodes.forEach((n) => {
      for (const i of intersections) {
        if (n.id === targetNode.id) {

          // Position of the child node
          // is at the top left of the parent node.
          const parentNode = getNode(i);
          n.parentId = i;
          n.position = {
            x: 0 + (targetNode.position.x - parentNode.position.x),
            y: 0 + (targetNode.position.y - parentNode.position.y),
          } satisfies XYPosition;
          
  
        }
      }
    });

    $nodes = $nodes;
  }

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
      <Sidebar {toObject} />
    </Resizable.Pane>

    <Resizable.Handle withHandle />

    <Resizable.Pane defaultSize={75}>
      <SvelteFlow
        {nodes}
        {nodeTypes}
        {edges}
        {edgeTypes}
        {defaultEdgeOptions}
        {initialViewport}
        on:dragover={onDragOver}
        on:drop={onDrop}
        on:nodedragstop={onNodeDragStop}
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

  :global(.svelte-flow.intersection-flow .svelte-flow__node.highlight) {
    background-color: #ff0072 !important;
    color: white;
  }
</style>
