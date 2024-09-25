<script lang="ts">
    import {
        Controls,
        Background,
        BackgroundVariant,
        type ColorMode,
    } from "@xyflow/svelte";

    import RunButton from "./run-button.svelte";
    import ColorButton from "./color-button.svelte";

    export let colorMode: ColorMode;
</script>

<Controls
    orientation="horizontal"
    position="bottom-center"
    class="flex gap-3 bg-ui-1 p-3 rounded-lg"
>
    <ColorButton bind:colorMode />
    <div class="!border-l pl-3">
        <RunButton />
    </div>
</Controls>
<Background variant={BackgroundVariant.Dots} gap={30} bgColor={"#0f0f0f"} />

<style>
    :global(.svelte-flow__controls-button) {
        @apply !w-12 !h-12 !bg-ui-2 rounded-lg;
    }
</style>
