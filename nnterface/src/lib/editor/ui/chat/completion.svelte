<script lang="ts">
    import { ArrowUp, Loader2 } from "lucide-svelte";

    import { useSvelteFlow, useNodes } from "@xyflow/svelte";
    import { exportGraph } from "$lib/editor/flow/utils";
    import { get } from "svelte/store";
    import { PUBLIC_BACKEND_URL } from "$env/static/public";

    let generationText = $state("");
    let isLoading = $state(false);

    let { temperature, maxNewTokens } = $props();

    const { toObject, getIntersectingNodes, updateNodeData } = useSvelteFlow();
    const nodes = useNodes();

    async function generate(messages: string) {
        console.log(messages);
        for (const n of get(nodes)) {
            if (n.type === "chat") {
                updateNodeData(n.id, {
                    messages: messages,
                    temperature: temperature[0],
                    maxNewTokens: maxNewTokens[0],
                });
            }
        }

        let graphObject = exportGraph(nodes, getIntersectingNodes, toObject);

        console.log(graphObject);

        const response = await fetch(`${PUBLIC_BACKEND_URL}/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(graphObject),
        });

        const result = await response.json();

        let r: string = "";
        for (const [nodeId, data] of Object.entries(result)) {
            r = data.slice(1, -1);
        }

        return r;
    }

    async function generateText() {
        if (isLoading) return;

        isLoading = true;
        const response = await generate(generationText);
        console.log(response);
        generationText = generationText + response;
        isLoading = false;
    }
</script>

<div class="flex flex-col h-full relative">
    <textarea
        bind:value={generationText}
        onkeydown={(e) =>
            e.key === "Enter" && !e.shiftKey && !isLoading && generateText()}
        placeholder="Enter text for completion..."
        class="flex-grow px-4 py-2 text-sm border bg-ui-1 rounded resize-none h-full font-mono whitespace-pre-wrap"
        disabled={isLoading}
        rows="20"
    ></textarea>
    <button
        onclick={generateText}
        class="absolute bottom-2 right-2 w-8 h-8 rounded bg-ui-2 flex items-center justify-center focus:outline-none focus:ring-1"
        disabled={isLoading}
    >
        {#if isLoading}
            <Loader2 class="h-5 w-5 animate-spin" />
        {:else}
            <ArrowUp class="h-5 w-5" />
        {/if}
    </button>
</div>
