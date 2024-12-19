<script lang="ts">
    import { useSvelteFlow } from "@xyflow/svelte";
    import { X } from "lucide-svelte";
    import { Separator } from "$lib/components/ui/separator";
    import Textarea from "@/lib/components/ui/textarea/textarea.svelte";

    let { id, data } = $props();

    let editing = $state(false);

    let open = $state(false);

    let { deleteElements } = useSvelteFlow();
    function handleClose() {
        deleteElements({ nodes: [{ id: id }] });
    }
</script>

{#if !open}
    <button
        class="tutorial !w-10 !h-10 rounded-full pulse-ring"
        onclick={() => (open = true)}
    >
        <div
            class="w-full text-[#AD8301] h-full flex items-center text-2xl rounded-full justify-center"
        >
            !
        </div>
    </button>
{/if}

{#if open}
    <div
        class="w-[175px] rounded p-3 !bg-[#AD8301] h-full"
        role="region"
    >
        <div class="flex justify-between">
            <button onclick={() => (editing = !editing)}><b>Info</b></button>
            <div class="flex items-center">
                <button class="" onclick={handleClose}>
                    <X class="h-5 w-5" />
                </button>
            </div>
        </div>
        <Separator class="my-2 bg-foreground" />

        {#if editing}
            <Textarea class="nodrag" bind:value={data.text} />
        {:else}
            <p>
                {data.text}
            </p>
        {/if}
    </div>
{/if}

<style>
    .pulse-ring {
        position: relative;
        box-shadow: 0 0 0 0 rgba(173, 131, 1, 0.7);
        animation: pulse 2s infinite;
    }

    @keyframes pulse {
        0% {
            box-shadow: 0 0 0 0 rgba(173, 131, 1, 0.7);
        }
        70% {
            box-shadow: 0 0 0 10px rgba(173, 131, 1, 0);
        }
        100% {
            box-shadow: 0 0 0 0 rgba(173, 131, 1, 0);
        }
    }
</style>
