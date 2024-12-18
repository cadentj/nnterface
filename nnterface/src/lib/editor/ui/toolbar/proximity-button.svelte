<script lang="ts">
    import { ControlButton } from "@xyflow/svelte";
    import { Wifi, WifiOff } from "lucide-svelte";
    import { editor } from "$lib/editor/handlers/states.svelte";
</script>

<ControlButton on:click={() => {editor.proximity = !editor.proximity}}>
    {#if editor.proximity}
        <Wifi />
    {:else}
        <WifiOff />
    {/if}
</ControlButton>