<script lang="ts">
    import { ControlButton } from "@xyflow/svelte";
    import { MessageSquare } from "lucide-svelte";
    import { chat } from "$lib/editor/handlers/states.svelte";

</script>

<ControlButton on:click={() => {chat.isVisible = !chat.isVisible}}>
    <MessageSquare />
</ControlButton>