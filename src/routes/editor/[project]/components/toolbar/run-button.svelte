<script lang="ts">
    import {
        ControlButton,
        useSvelteFlow,
        useNodes,
        type Node,
    } from "@xyflow/svelte";
    import { Play } from "lucide-svelte";
    import { clearParents } from "../utils";

    const { toObject, updateNodeData, getIntersectingNodes } = useSvelteFlow();
    const nodes = useNodes();

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
        updateIntersections();

        const response = await fetch("/api/run", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(toObject()),
        });

        const result = await response.json();

        console.log(toObject());

        for (const [nodeId, data] of Object.entries(result)) {
            if (nodeId.includes("graph")) {
                updateNodeData(nodeId, { graphData: JSON.parse(data) });
            } else {
                console.log(data);
                updateNodeData(nodeId, { messages: JSON.parse(data) });
            }
        }

        console.log(result);
    }
</script>

<ControlButton on:click={run}>
    <Play style="color: green;" />
</ControlButton>
