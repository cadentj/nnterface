<script lang="ts">
    import { ControlButton } from "@xyflow/svelte";
    import { MessageSquare } from "lucide-svelte";
    import { chat, editor } from "$lib/editor/handlers/states.svelte";


    function toggleChat() {
        chat.isVisible = !chat.isVisible;
    }
</script>

<ControlButton on:click={toggleChat} >
    <MessageSquare/>
</ControlButton>