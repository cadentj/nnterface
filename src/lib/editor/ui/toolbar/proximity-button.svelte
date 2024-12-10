<script lang="ts">
    import { ControlButton } from "@xyflow/svelte";
    import { Wifi, WifiOff } from "lucide-svelte";
    import { proximity } from "$lib/editor/handlers/states.svelte";
</script>

<ControlButton on:click={() => {proximity.isOn = !proximity.isOn}}>
    {#if proximity.isOn}
        <Wifi />
    {:else}
        <WifiOff />
    {/if}
</ControlButton>