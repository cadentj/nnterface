<script lang="ts">
  import { writable } from "svelte/store";
  import {
    SvelteFlow,
    Controls,
    Background,
    BackgroundVariant,
    MiniMap,
    useSvelteFlow,
    MarkerType,
    type Node,
    type NodeTypes,
    type Viewport,
    type DefaultEdgeOptions,
    useInternalNode,
  } from "@xyflow/svelte";

  import "@xyflow/svelte/dist/style.css";
  import { useDnD } from "./utils";
  import Sidebar from "./Sidebar.svelte";
  import * as Resizable from "$lib/components/ui/resizable";

  import LoopContext from "./contexts/LoopContext.svelte";

  import TokenNode from "./nodes/token-node/TokenNode.svelte";
  import ProtocolEdge from "./edges/ProtocolEdge.svelte";
  import { compile } from "./compile";

  const nodeTypes: NodeTypes = {
    text: TokenNode,
    context: LoopContext,
  };

  const edgeTypes = {
    protocol: ProtocolEdge,
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
      type: "context",
      data: { label: "Output Node" },
      position: { x: 300, y: 150 },
      style:
        "background: #fff; border: 1px solid black; border-radius: 15px; font-size: 12px;",
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

  const defaultEdgeOptions: DefaultEdgeOptions = {
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  };

  const edges = writable([
    {
      id: "1-2",
      type: "default",
      source: "1",
      target: "2",
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    },
    {
      id: "1-3",
      type: "protocol",
      source: "1",
      target: "3",
    },
  ]);

  const { screenToFlowPosition, getIntersectingNodes } = useSvelteFlow();

  function onNodeDrag({ detail: { targetNode } }) {
    const intersections = getIntersectingNodes(targetNode, false).map(
      (n) => n.id,
    );

    $nodes.forEach((n) => {
      n.class = intersections.includes(n.id) ? "highlight" : "";

      if (intersections.includes(n.id)) {
        console.log("intersecting!");
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

  const run = () => {
    compile(nodes, edges);
  };
</script>

<main>
  <Resizable.PaneGroup direction="horizontal">
    <Resizable.Pane>
      <Sidebar {run} />
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
        on:nodedrag={onNodeDrag}
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
