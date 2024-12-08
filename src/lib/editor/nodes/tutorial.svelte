<script lang="ts">
    import { useSvelteFlow } from "@xyflow/svelte";
    import { X, ArrowDownLeft } from "lucide-svelte";
    import { Separator } from "$lib/components/ui/separator";
    import Textarea from "@/lib/components/ui/textarea/textarea.svelte";

    let { id, data } = $props();

    let editing = $state(false);

    let { deleteElements } = useSvelteFlow();
    function handleClose() {
        deleteElements({nodes: [{id : id}]});
    }
</script>

<div class="bg-card w-full h-full rounded-lg" ondblclick={() => editing = !editing} role="region">
    <div class="node max-w-[200px] !bg-[#38AFFD]/10">
        <div class="flex justify-between">
            <b>Info</b>
            <button class="" onclick={handleClose}>
                <X class="h-5 w-5" />
            </button>
        </div>
        <Separator class="my-2 bg-foreground" />

        {#if editing}
            <Textarea bind:value={data.text}/>
        {:else}
            <p class="mb-1">
                {data.text}
            </p>
        {/if}

        <ArrowDownLeft class="h-5 w-5 mt-2" />
    </div>
</div>
