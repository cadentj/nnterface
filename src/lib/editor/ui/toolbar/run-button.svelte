<script lang="ts">
    import {
        ControlButton,
        useSvelteFlow,
        useNodes,
        useEdges,
        type Node,
    } from "@xyflow/svelte";
    import { Play } from "lucide-svelte";
    import { clearParents } from "$lib/editor/flow/utils";
    import { onMount } from "svelte";
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

    function updateIntersections() {
        nodes.update((nodes) => {
            nodes = clearParents(nodes);

            nodes.map((node: Node) => {
                const intersectingNodes = getIntersectingNodes(
                    node,
                    false,
                    nodes,
                );
                if (intersectingNodes.length >= 1) {
                    node.data.parents = node.data.parents.concat(
                        intersectingNodes.map((n) => n.id),
                    );
                }
                return node;
            });

            return nodes;
        });

        let graphObject = toObject();

        graphObject.nodes = graphObject.nodes.filter((node: Node) => node.type !== "tutorial");

        return graphObject;
    }

    async function run() {
        const graphObject = updateIntersections();

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
