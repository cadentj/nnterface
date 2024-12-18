<script lang="ts">
    import { ControlButton } from "@xyflow/svelte";
    import { Grid2x2Plus, Grid2x2X } from "lucide-svelte";
    import { editor } from "$lib/editor/handlers/states.svelte";

    function toggleSnapGrid() {
        if (editor.snapGrid === undefined) {
            editor.snapGrid = [20, 20];
        } else {
            editor.snapGrid = undefined;
        }
    }
</script>

<ControlButton on:click={toggleSnapGrid}>
    {#if editor.snapGrid}
        <Grid2x2Plus />
    {:else}
        <Grid2x2X />
    {/if}
</ControlButton>