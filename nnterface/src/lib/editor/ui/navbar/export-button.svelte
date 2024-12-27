<script lang="ts">
    import { useSvelteFlow, useNodes } from "@xyflow/svelte";
    import { Code } from "lucide-svelte";
    import CodeBlock from "./code-block.svelte";
    import * as Dialog from "$lib/components/ui/dialog";
    import { Button } from "$lib/components/ui/button";
    import { exportGraph } from "@/lib/editor/flow/utils";

    import { PUBLIC_BACKEND_URL } from "$env/static/public";

    const { toObject, getIntersectingNodes } = useSvelteFlow();
    const nodes = useNodes();

    let open = $state(false);
    let code = $state("");

    async function exportCode() {
        const graphObject = exportGraph(nodes, getIntersectingNodes, toObject);

        const response = await fetch(`${PUBLIC_BACKEND_URL}/code`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(graphObject),
        });

        const result = await response.json();

        // Bind opening to a custom trigger to
        // correctly await for compiled code.
        code = result["code"];
        open = true;
    }
</script>

<Dialog.Root bind:open>
    <Button
        onclick={() => exportCode()}
        class="bg-gradient border-none"
        variant="outline"
        size="xs"
    >
        Export
        <Code class="w-5 h-5 ml-2" />
    </Button>
    <Dialog.Content class="min-w-[30vw] h-[50vh] flex flex-col">
        <Dialog.Title>Export Code</Dialog.Title>
        <CodeBlock {code} />
    </Dialog.Content>
</Dialog.Root>
