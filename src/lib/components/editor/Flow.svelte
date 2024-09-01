<script lang="ts">
  import {
    SvelteFlow,
    Controls,
    Background,
    BackgroundVariant,
    MiniMap,
    useSvelteFlow,
    ControlButton,
    type Node,
    type ColorMode,
    type Viewport,
  } from "@xyflow/svelte";
  import { Play } from "lucide-svelte";
  import "@xyflow/svelte/dist/style.css";
  import { useDnD } from "./utils";
  import Sidebar from "./Sidebar.svelte";
  import * as Resizable from "$lib/components/ui/resizable";

  import {
    nodeTypes,
    nodes,
    edges,
    defaultEdgeOptions,
  } from "./flow";

  const { screenToFlowPosition, getIntersectingNodes, toObject, getNode } =
    useSvelteFlow();

  function onNodeDragStop({ detail: { targetNode } }) {
    const intersections = getIntersectingNodes(targetNode, true).map(
      (n) => n.id,
    );

    console.log(targetNode.id, "intersects with", intersections);
    let updatedNodes = [...$nodes];

    for (const i of intersections) {

      // Dragging the parent can overlap with its children
      // Skip the parent node
      const parentNode = getNode(i);
      if ("parentId" in parentNode && parentNode.parentId != undefined) {
        if (parentNode.parentId == targetNode.id) {
          continue;
        }
      }

      // Get the index of the target in the nodes array
      const targetNodeIndex = updatedNodes.findIndex(
        (n) => n.id === targetNode.id,
      );

      // Update the node's parent and position
      const movedNode = updatedNodes[targetNodeIndex];
      movedNode.parentId = i;

      movedNode.position = {
        x: targetNode.position.x - parentNode.position.x,
        y: targetNode.position.y - parentNode.position.y,
      };

      // Remove the node from its current position
      updatedNodes.splice(targetNodeIndex, 1);

      // Find the new position to insert the node (right after its new parent)
      const parentIndex = updatedNodes.findIndex((n) => n.id === i);
      updatedNodes.splice(parentIndex + 1, 0, movedNode);

    }

    // Update the nodes array
    $nodes = updatedNodes;
  }
  const type = useDnD();

  const onDragOver = (event: DragEvent) => {
    event.preventDefault();

    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = "move";
    }
  };

  const initialViewport = {
    zoom: 1,
    x: 0,
    y: 0,
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

    const numNodes = ($nodes.length + 3).toString();

    const newNode = {
      ...$type,
      id: numNodes,
      position: position,
      origin: [0.5, 0.5],
    } satisfies Node;

    $nodes.push(newNode);
    $nodes = $nodes;
  };


  async function createItem() {
        const response = await fetch('/api/editor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: 'New Item', description: 'This is a new item' }),
        });
        const result = await response.json();
        console.log(result);
    }

    let colorMode: ColorMode = 'dark';
</script>

<main>
  <Resizable.PaneGroup direction="horizontal">
    <Resizable.Pane>
      <Sidebar />
    </Resizable.Pane>

    <Resizable.Handle withHandle />

    <Resizable.Pane defaultSize={80}>
      <SvelteFlow
        {nodes}
        {nodeTypes}
        {edges}
        {defaultEdgeOptions}
        {initialViewport}
        on:dragover={onDragOver}
        on:drop={onDrop}
        on:nodedragstop={onNodeDragStop}
        fitView
      >
        <Controls>
          <ControlButton on:click={() => createItem()}>
            <Play style="color: green;"/>
          </ControlButton>
        </Controls>
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
