<script lang="ts">
  import {
    SvelteFlow,
    Controls,
    Background,
    BackgroundVariant,
    useSvelteFlow,
    ControlButton,
    type XYPosition,
    type Node,
    type ColorMode,
    type Viewport,
  } from "@xyflow/svelte";
  import { Play } from "lucide-svelte";
  import "@xyflow/svelte/dist/style.css";
  import "./nodes/nodes.css";
  import { useDnD, updateNodePosition } from "./utils";
  import Sidebar from "./sidebar.svelte";
  import * as Resizable from "$lib/components/ui/resizable";

  import { toggleMode } from "mode-watcher";

  import { nodeTypes, nodes, edges, defaultEdgeOptions } from "./flow";

  const { screenToFlowPosition, getIntersectingNodes, updateNode, getNode } =
    useSvelteFlow();

  const onNodeDragStop = ({ detail: { targetNode } }) => {
    const intersections = getIntersectingNodes(targetNode, false);

    console.log("intersections", intersections.map((node) => node.id));

    if (intersections.length === 0) {
      if (targetNode.parentId != undefined) {
        console.log("four")
        const parentNode: Node = getNode(targetNode.parentId);

        const newPosition = {
          x: targetNode.position.x + parentNode.position.x,
          y: targetNode.position.y + parentNode.position.y,
        } satisfies XYPosition;

        updateNode(targetNode.id, {position: newPosition});
        updateNode(targetNode.id, {parentId: undefined});
      }
      console.log("five")
      return;

    }

    let updatedNodes: Node[] = [...$nodes];
    const parentNode: Node = intersections[intersections.length - 1];

    if (
      parentNode.parentId != undefined &&
      parentNode.parentId === targetNode.id
    ) {
      console.log("one")
      // Skip the parent node
      return;
    } else if (parentNode.id === targetNode.parentId) {
      console.log("two")
      // Already a child of the parent
      return;
    } else {
      console.log("three", parentNode.id)
      updatedNodes = updateNodePosition(updatedNodes, targetNode, parentNode);
      $nodes = updatedNodes;
    }
  };

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
      origin: [0, 0],
    } satisfies Node;

    $nodes.push(newNode);
    $nodes = $nodes;
  };

  let colorMode: ColorMode = "light";

  const toggleColorMode = () => {
    colorMode = colorMode === "dark" ? "light" : "dark";

    toggleMode();
  };
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
        {colorMode}
        {initialViewport}
        on:dragover={onDragOver}
        on:drop={onDrop}
        on:nodedragstop={onNodeDragStop}
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
