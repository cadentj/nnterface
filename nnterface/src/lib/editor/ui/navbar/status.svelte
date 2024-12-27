<script lang="ts">
    import { Cloud } from "lucide-svelte";
    import { editor } from "$lib/editor/handlers/states.svelte";

    const statusColor = {
        "online": "bg-muted",
        "offline": "bg-muted",
        "connecting": "border-yellow-500/60",
        "running": "border-blue-500/60",
    }

    const color = $derived(statusColor[editor.status]);
</script>

<div class=" h-8 px-3 py-2 rounded text-sm flex items-center {color}">
    Offline 
    <Cloud class="w-5 h-5 ml-2" />
</div>