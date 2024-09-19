<script lang="ts">
    import {
        Controls,
        Background,
        BackgroundVariant,
        ControlButton,
        type ColorMode,
    } from "@xyflow/svelte";

    import { setMode } from "mode-watcher";
    import { Play, Sun, Moon, Terminal } from "lucide-svelte";

    export let colorMode: ColorMode;
    export let compile: () => void;
    
    setMode(colorMode);

    const toggleColorMode = () => {
        colorMode = colorMode === "dark" ? "light" : "dark";
        setMode(colorMode);
    };

</script>

<Controls orientation="horizontal" position="bottom-center" class="!h-16 bg-bg-1 p-2 rounded-md">
    <ControlButton on:click={toggleColorMode}>
        {#if colorMode === "dark"}
            <Sun />
        {:else}
            <Moon />
        {/if}
    </ControlButton>
    <ControlButton on:click={compile}>
        <Play style="color: green;" />
    </ControlButton>
</Controls>
<Background variant={BackgroundVariant.Dots} />

<style>
    :global(.svelte-flow__controls-button) {
        @apply !w-10 !h-10 mx-2 !bg-ui-2;
    }
</style>