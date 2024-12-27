<script lang="ts">
    import { ControlButton } from "@xyflow/svelte";
    import { Wrench } from "lucide-svelte";
    import { editor } from "$lib/editor/handlers/states.svelte";


    function toggleChat() {
        editor.rightSidebarVisible = !editor.rightSidebarVisible;
    }
</script>

<ControlButton on:click={toggleChat} >
    <Wrench/>
</ControlButton>