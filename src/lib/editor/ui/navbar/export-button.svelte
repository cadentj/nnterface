<script lang="ts">
    import { useSvelteFlow, useNodes, type Node } from "@xyflow/svelte";
    import { Code } from "lucide-svelte";
    import CodeBlock from "./code-block.svelte";
    import {buttonVariants} from "$lib/components/ui/button/button.svelte";
    import * as Dialog from "$lib/components/ui/dialog";
    import { exportGraph } from "@/lib/editor/flow/utils";

    const { toObject, getIntersectingNodes } = useSvelteFlow();
    const nodes = useNodes();

    let code: string = "";

    async function exportCode() {
        const graphObject = exportGraph(
            nodes, 
            getIntersectingNodes, 
            toObject,
        );

        const response = await fetch("/api/code", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(graphObject),
        });

        const result = await response.json();   

        code = result["code"];
    }
</script>

<Dialog.Root onOpenChange={() => exportCode()}>
    <Dialog.Trigger class="pointer-events-auto {buttonVariants({variant: "outline"})}">
        Export
        <Code class="w-5 h-5 ml-2" />
    </Dialog.Trigger>
    <Dialog.Content class="min-w-fit">
        <Dialog.Title>Export Code</Dialog.Title>
        <CodeBlock {code} />
    </Dialog.Content>
</Dialog.Root>
