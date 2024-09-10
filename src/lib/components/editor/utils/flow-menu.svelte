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

    export let showViewPane: boolean;

    const toggleViewPane = () => {
        showViewPane = !showViewPane;
    };
</script>

<Controls>
    <ControlButton on:click={toggleColorMode}>
        {#if colorMode === "dark"}
            <Sun />
        {:else}
            <Moon />
        {/if}
    </ControlButton>
    <ControlButton on:click={toggleViewPane}>
        <Terminal />
    </ControlButton>
    <ControlButton on:click={compile}>
        <Play style="color: green;" />
    </ControlButton>
</Controls>
<Background variant={BackgroundVariant.Dots} />
