<script lang="ts">
    import { ControlButton } from "@xyflow/svelte";
    import { Blocks } from "lucide-svelte";
    import { editor } from "$lib/editor/handlers/states.svelte";

    function toggleSnapGrid() {
        if (editor.snapGrid === undefined) {
            editor.snapGrid = [15, 15];
        } else {
            editor.snapGrid = undefined;
        }
    }


</script>

<ControlButton on:click={toggleSnapGrid} class={editor.snapGrid !== undefined ? "bg-ui-2" : ""}>
    <Blocks />
</ControlButton>