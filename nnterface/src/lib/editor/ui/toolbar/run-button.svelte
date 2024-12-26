<script lang="ts">
    import {
        ControlButton,
        useSvelteFlow,
        useNodes,
        useEdges,
    } from "@xyflow/svelte";
    import { Play } from "lucide-svelte";
    import { exportGraph } from "$lib/editor/flow/utils";
    import { PUBLIC_BACKEND_URL } from '$env/static/public';
    import { animate } from "@/lib/editor/flow/animate";

    const { toObject, updateNodeData, getIntersectingNodes } = useSvelteFlow();
    const nodes = useNodes();
    const edges = useEdges();

    async function animateOrder(graphObject: any) {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/run/order`, {
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
        try {
            const graphObject = exportGraph(
                nodes,
                getIntersectingNodes,
                toObject,
            );

            await animateOrder(graphObject);

            const response = await fetch(`${PUBLIC_BACKEND_URL}/run`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(graphObject),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Run failed:', response.status, errorText);
                return;
            }

            const result = await response.json();

            for (const [nodeId, data] of Object.entries(result)) {
                if (nodeId.includes("graph")) {
                    updateNodeData(nodeId, { graphData: JSON.parse(data) });
                } else {
                    updateNodeData(nodeId, { messages: JSON.parse(data) });
                }
            }
        } catch (error) {
            console.error('Error during run:', error);
        }
    }
</script>

<ControlButton onclick={run} class="bg-gradient hover:brightness-125">
    <Play />
</ControlButton>