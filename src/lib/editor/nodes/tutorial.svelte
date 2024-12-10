<script lang="ts">
    import { useSvelteFlow } from "@xyflow/svelte";
    import { X, ArrowDownLeft, Pencil, Lightbulb } from "lucide-svelte";
    import { Button } from "$lib/components/ui/button/index.js";
    import { Separator } from "$lib/components/ui/separator";
    import Textarea from "@/lib/components/ui/textarea/textarea.svelte";

    let { id, data } = $props();

    let editing = $state(false);

    let open = $state(false);

    let { deleteElements } = useSvelteFlow();
    function handleClose() {
        deleteElements({nodes: [{id : id}]});
    }
</script>

{#if !open}
    <button class="bg-card !w-10 !h-10 rounded-lg duration-500" onclick={() => open = true}>
        <div class="!bg-[#E7B73D]/30 w-full h-full animate-pulse flex items-center rounded-lg justify-center">
            <Lightbulb class="h-6 w-6" />
        </div>
    </button>
{/if}

{#if open}
<div class="bg-card w-[175px] h-full rounded-lg" role="region">
    <div class="node !bg-[#E7B73D]/10">
        <div class="flex justify-between">
            <button onclick={() => editing = !editing}><b>Info</b></button>
            <div class="flex items-center">
                <button class="" onclick={handleClose}>
                    <X class="h-5 w-5" />
                </button>
            </div>
        </div>
        <Separator class="my-2 bg-foreground" />

        {#if editing}
            <Textarea bind:value={data.text}/>
        {:else}
            <p >
                {data.text}
            </p>
        {/if}
    </div>
</div>
{/if}