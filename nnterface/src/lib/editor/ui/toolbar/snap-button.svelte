<script lang="ts">
    import { ControlButton } from "@xyflow/svelte";
    import { LayoutGrid } from "lucide-svelte";
    import { editor } from "$lib/editor/handlers/states.svelte";

    function toggleSnapGrid() {
        if (editor.snapGrid === null) {
            editor.snapGrid = [15, 15];
        } else {
            editor.snapGrid = null;
        }
    }
</script>

<ControlButton
    on:click={toggleSnapGrid}
    class={editor.snapGrid !== null ? "bg-ui-2" : ""}
>
    <LayoutGrid />
</ControlButton>
