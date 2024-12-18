<script lang="ts">
    import { useSvelteFlow, useNodes, type Node } from "@xyflow/svelte";
    import { Download, Clipboard } from "lucide-svelte";
    import {buttonVariants} from "$lib/components/ui/button/button.svelte";
    import * as Dialog from "$lib/components/ui/dialog";
    import { clearParents } from "@/lib/editor/flow/utils";
    import { Button } from "$lib/components/ui/button/index.js";
    import { modelSelector } from "@/lib/editor/handlers/states.svelte";

    const { toObject, getIntersectingNodes } = useSvelteFlow();
    const nodes = useNodes();

    let code: any = $state({});

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

        console.log(modelSelector.modelId);
        let graphObject = toObject();
        graphObject["modelId"] = modelSelector.modelId;
        code = JSON.stringify(graphObject, null, 2);
    }
</script>

<Dialog.Root onOpenChange={() => exportGraph()}>
    <Dialog.Trigger class={buttonVariants({variant: "default"})}>
        Save
        <Download class="w-5 h-5 ml-2" />
    </Dialog.Trigger>
    <Dialog.Content class="max-w-[50%] max-h-[50%]">
        <Dialog.Title>Save</Dialog.Title>
        <div class="max-h-[400px] overflow-y-auto rounded border p-4 bg-secondary/10">
            <div class="relative">

                <Button 
                    variant="outline"
                    size="icon"
                    class="absolute top-0 right-0"
                    onclick={() => navigator.clipboard.writeText(code)}
                >
                    <Clipboard class="w-5 h-5" />
            </Button>
                <pre class="whitespace-pre-wrap break-words">{code}</pre>
            </div>
        </div>
    </Dialog.Content>
</Dialog.Root>
