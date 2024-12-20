<script lang="ts">
    import { useSvelteFlow, useNodes, type Node } from "@xyflow/svelte";
    import { Download, Clipboard } from "lucide-svelte";
    import { buttonVariants } from "$lib/components/ui/button/button.svelte";
    import * as Dialog from "$lib/components/ui/dialog";
    import { clearParents } from "@/lib/editor/flow/utils";
    import { Button } from "$lib/components/ui/button/index.js";
    import { modelSelector } from "@/lib/editor/handlers/states.svelte";

    const { toObject, getIntersectingNodes } = useSvelteFlow();
    const nodes = useNodes();

    let code: any = $state({});

    let open = $state(false);
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

        let graphObject = toObject();
        graphObject["modelId"] = modelSelector.modelId;
        code = JSON.stringify(graphObject, null, 2);
    }
</script>

<Dialog.Root onOpenChange={() => exportGraph()} bind:open>
    <Button
        onclick={() => (open = !open)}
        variant="default"
    >
        Save
        <Download class="w-5 h-5 ml-2" />
    </Button>
    <Dialog.Content class="min-w-[30vw] h-[50vh]">
        <Dialog.Title>Save</Dialog.Title>
        <div class="h-full w-full overflow-scroll rounded border p-3 relative">
            <Button
                variant="outline"
                size="icon"
                class="absolute top-2 right-2 h-8 w-8"
                onclick={() => navigator.clipboard.writeText(code)}
            >
                <Clipboard class="w-5 h-5" />
            </Button>
            <pre class="whitespace-pre-wrap break-words">{code}</pre>
        </div>
    </Dialog.Content>
</Dialog.Root>
