<script lang="ts">
    import { useSvelteFlow, useNodes, type Node } from "@xyflow/svelte";
    import { Download } from "lucide-svelte";
    import {buttonVariants} from "$lib/components/ui/button/button.svelte";
    import * as Dialog from "$lib/components/ui/dialog";
    import { clearParents } from "@/lib/editor/flow/utils";

    const { toObject, getIntersectingNodes } = useSvelteFlow();
    const nodes = useNodes();

    let code: string = "";

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

    async function exportGraph() {
        updateIntersections();

        code = JSON.stringify(toObject(), null, 2);
    }
</script>

<Dialog.Root onOpenChange={() => exportGraph()}>
    <Dialog.Trigger class="pointer-events-auto {buttonVariants({variant: "default"})}">
        Save
        <Download class="w-5 h-5 ml-2" />
    </Dialog.Trigger>
    <Dialog.Content class="max-w-[50%] max-h-[50%]">
        <Dialog.Title>Save</Dialog.Title>
        <div class="max-h-[400px] overflow-y-auto rounded border p-4 bg-secondary/10">
            <pre class="whitespace-pre-wrap break-words">{code}</pre>
        </div>
    </Dialog.Content>
</Dialog.Root>
