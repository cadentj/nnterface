<script lang="ts">
    import {
        ControlButton,
        type ColorMode,
    } from "@xyflow/svelte";

    import { setMode } from "mode-watcher";
    import { Sun, Moon } from "lucide-svelte";
    import { onMount } from "svelte";

    export let colorMode: ColorMode;

    const toggleColorMode = () => {
        colorMode = colorMode === "dark" ? "light" : "dark";
        setMode(colorMode);
    };

    onMount(() => {
        setMode(colorMode);
    });
</script>

<ControlButton on:click={toggleColorMode} disabled>
    {#if colorMode === "dark"}
        <Sun />
    {:else}
        <Moon />
    {/if}
</ControlButton>
