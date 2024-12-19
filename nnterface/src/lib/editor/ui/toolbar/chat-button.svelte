<script lang="ts">
    import { ControlButton } from "@xyflow/svelte";
    import { MessageSquare } from "lucide-svelte";
    import { chat, editor } from "$lib/editor/handlers/states.svelte";


    function toggleChat() {
        if (editor.chatNodeExists) {
            chat.isVisible = !chat.isVisible;
        }
    }
</script>

<ControlButton on:click={toggleChat} disabled={!editor.chatNodeExists} class={!editor.chatNodeExists ? "disabled" : ""}>
    <MessageSquare class={editor.chatNodeExists ? "" : "text-ui-2"}/>
</ControlButton>