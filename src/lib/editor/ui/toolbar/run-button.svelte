<script lang="ts">
    import {
        ControlButton,
        useSvelteFlow,
        useNodes,
        useEdges,
        type Node,
    } from "@xyflow/svelte";
    import { Play } from "lucide-svelte";
    import { exportGraph } from "$lib/editor/flow/utils";
    import { animate } from "@/lib/editor/flow/animate";

    const { toObject, updateNodeData, getIntersectingNodes } = useSvelteFlow();
    const nodes = useNodes();
    const edges = useEdges();

    async function animateOrder(graphObject: any) {
        const response = await fetch("/api/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(graphObject),
        });

        const result = await response.json();
        
        animate(result.order, nodes, edges);
    }

    async function run() {
        const graphObject = exportGraph(
            nodes,
            getIntersectingNodes,
            toObject,
        );

        animateOrder(graphObject);

        const response = await fetch("/api/run", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(graphObject),
        });

        const result = await response.json();

        for (const [nodeId, data] of Object.entries(result)) {
            if (nodeId.includes("graph")) {
                updateNodeData(nodeId, { graphData: JSON.parse(data) });
            } else {
                console.log(data);
                updateNodeData(nodeId, { messages: JSON.parse(data) });
            }
        }
    }
</script>

<ControlButton onclick={run}>
    <Play style="color: green;" />
</ControlButton>
