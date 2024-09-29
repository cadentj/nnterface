<script lang="ts">
    import { useSvelteFlow, useNodes, type Node } from "@xyflow/svelte";

    import { Code } from "lucide-svelte";
    import CodeBlock from "./code-block.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import * as Dialog from "$lib/components/ui/dialog";

    import { clearParents } from "../utils";

    const { toObject, getIntersectingNodes } = useSvelteFlow();
    const nodes = useNodes();

    let code: string;

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

    async function exportCode() {
        updateIntersections();

        const response = await fetch("/api/code", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(toObject()),
        });

        const result = await response.json();

        code = result["code"];
    }
</script>

<Dialog.Root>
    <Dialog.Trigger>
        <Button
            class="pointer-events-auto "
            variant="outline"
            on:click={exportCode}
        >
            Export
            <Code class="w-5 h-5 ml-2" />
        </Button>
    </Dialog.Trigger>
    <Dialog.Content class="min-w-fit">
        <Dialog.Title>Export Code</Dialog.Title>
        <CodeBlock {code} />
    </Dialog.Content>
</Dialog.Root>
