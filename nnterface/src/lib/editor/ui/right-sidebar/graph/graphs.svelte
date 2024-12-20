<script lang="ts">
    import { useNodes, useSvelteFlow, type Node } from "@xyflow/svelte";
    import Line from "./line.svelte";
    import { Button } from "$lib/components/ui/button";

    const nodes = useNodes();
    const { getNode } = useSvelteFlow();

    // Track selected graphs and data for each instance
    let selectedGraphs: (string | null)[] = $state([null, null]);
    let graphsData: any[] = $state([null, null]);
    let selecting: boolean[] = $state([false, false]);

    let graphNodes = $derived(
        $nodes.filter((node) => node.data.variant === "graph"),
    );

    function toggleSelecting(idx: number) {
        selecting[idx] = !selecting[idx];
    }

    function handleGraphSelect(nodeId: string, idx: number) {
        selectedGraphs[idx] = nodeId;
        graphsData[idx] = getNode(nodeId)?.data.graphData;
    }
</script>

{#snippet graphSelect(idx: number)}
    {#if !selectedGraphs[idx]}
        <div class="border-2 border-dashed border-ui-1 rounded p-5">
            {#if graphNodes.length === 0}
                <div
                    class="flex flex-col items-center justify-center text-muted-foreground/60"
                >
                    <span>No graphs available</span>
                </div>
            {:else if selecting[idx]}
                <div class="grid grid-cols-2 gap-2">
                    {#each graphNodes as node}
                        <Button
                            variant="ghost"
                            class="flex items-center justify-center p-4 h-24 border rounded hover:bg-muted/50"
                            onclick={() => handleGraphSelect(node.id, idx)}
                        >
                            {node.id}
                        </Button>
                    {/each}
                </div>
            {:else}
                <div
                    class="flex flex-col items-center justify-center text-muted-foreground/60"
                >
                    <span
                        class="hover:text-muted-foreground"
                        onclick={() => toggleSelecting(idx)}>Add a graph +</span
                    >
                </div>
            {/if}
        </div>
    {:else}
        <div class="relative">
            <Button
                variant="ghost"
                size="icon"
                class="absolute top-0 right-0 z-10"
                onclick={() => (selectedGraphs[idx] = null)}
            >
                ×
            </Button>
            <Line dataToGraph={graphsData[idx]} />
        </div>
    {/if}
{/snippet}

<div class="p-6 flex flex-col gap-6">
    {#each selecting as _, idx}
        {@render graphSelect(idx)}
    {/each}
</div>
