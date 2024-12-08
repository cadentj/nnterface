<script lang="ts">
    import {
        ControlButton,
        useSvelteFlow,
        useNodes,
        type Node,
    } from "@xyflow/svelte";
    import { Play } from "lucide-svelte";
    import { clearParents } from "$lib/editor/flow/utils";
    import { onMount } from "svelte";
    import { animate } from "@/lib/editor/flow/animate";

    const { toObject, updateNodeData, getIntersectingNodes } = useSvelteFlow();
    const nodes = useNodes();

    async function animateOrder() {
        updateIntersections();

        const response = await fetch("/api/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(toObject()),
        });

        const result = await response.json();


        console.log(result.order);
        
        animate(result.order);
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
    }

    async function run() {
        animateOrder();
        // updateIntersections();

        // const response = await fetch("/api/run", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(toObject()),
        // });

        // const result = await response.json();

        // console.log(toObject());

        // for (const [nodeId, data] of Object.entries(result)) {
        //     if (nodeId.includes("graph")) {
        //         updateNodeData(nodeId, { graphData: JSON.parse(data) });
        //     } else {
        //         console.log(data);
        //         updateNodeData(nodeId, { messages: JSON.parse(data) });
        //     }
        // }

        // console.log(result);
    }
</script>

<ControlButton onclick={run}>
    <Play style="color: green;" />
</ControlButton>
