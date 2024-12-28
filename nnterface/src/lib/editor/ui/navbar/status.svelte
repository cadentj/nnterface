<script lang="ts">
    import { Cloud, Loader2 } from "lucide-svelte";
    import { editor } from "$lib/editor/handlers/states.svelte";

    const statusColor: Record<string, string> = {
        "online": "bg-[#00CA50]/20 text-[#00CA50]",
        "offline": "bg-muted",
        "error": "bg-[#D14D41]/20 text-[#D14D41]",
        "running": "bg-[#47A8FF]/20 text-[#47A8FF]",
    }

    const color = $derived(statusColor[editor.status]);
</script>

<div class=" h-8 px-3 py-2 gap-2 rounded text-sm flex items-center {color}">
    {editor.status}
    {#if editor.status === "running"}
        <Loader2 class="h-5 w-5 animate-spin" />
    {:else}
        <Cloud class="w-5 h-5" />
    {/if}
</div>