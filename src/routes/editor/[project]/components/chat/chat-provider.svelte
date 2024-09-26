<script lang="ts">
    import { useSvelteFlow, useNodes, type Node } from "@xyflow/svelte";
    import { clearParents } from "../utils";

    const { toObject, getIntersectingNodes, updateNodeData } = useSvelteFlow();

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

    export async function chat(messages) {
        updateIntersections();

        updateNodeData("chat0", { messages: messages });

        console.log(messages)

        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(toObject()),
        });

        const result = await response.json();

        console.log(result);

        let r;
        for (const [nodeId, data] of Object.entries(result)) {
            r = JSON.parse(data).at(-1)['content']; 
        }

        return r;
    }
</script>

<slot/>