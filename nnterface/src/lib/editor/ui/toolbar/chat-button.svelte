<script lang="ts">
    import { ControlButton } from "@xyflow/svelte";
    import { MessageSquare, MessageSquareOff } from "lucide-svelte";
    import { chat, editor } from "$lib/editor/handlers/states.svelte";


    function toggleChat() {
        if (editor.chatNodeExists) {
            chat.isVisible = !chat.isVisible;
        }
    }
</script>

<ControlButton on:click={toggleChat} class={chat.isVisible ? "bg-ui-2" : ""}>
    {#if editor.chatNodeExists}
        <MessageSquare />
    {:else}
        <MessageSquareOff />
    {/if}
</ControlButton>
