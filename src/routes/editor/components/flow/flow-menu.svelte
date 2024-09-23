<script lang="ts">
    import {
        Controls,
        Background,
        BackgroundVariant,
        ControlButton,
        type ColorMode,
        MiniMap
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

<Controls
    orientation="horizontal"
    position="bottom-center"
    class="flex gap-3 bg-ui-1 p-3 rounded-lg"
>
    <ControlButton on:click={toggleColorMode} disabled>
        {#if colorMode === "dark"}
            <Sun />
        {:else}
            <Moon />
        {/if}
    </ControlButton>
    <div class="!border-l pl-3">
        <ControlButton on:click={compile}>
            <Play style="color: green;"/>
        </ControlButton>
    </div>
</Controls>
<Background variant={BackgroundVariant.Dots} gap={30}  bgColor={"#0f0f0f"}/>
<!-- <MiniMap height={80} width={100}/> -->


<style>
    :global(.svelte-flow__controls-button) {
        @apply !w-12 !h-12 !bg-ui-2 rounded-lg;
    }
</style>
