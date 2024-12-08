<script lang="ts">
    import {
        Controls,
        Background,
        BackgroundVariant,
    } from "@xyflow/svelte";
    import RunButton from "./run-button.svelte";
    import ChatButton from "./chat-button.svelte";
</script>

<Controls
    orientation="horizontal"
    position="bottom-center"
    class="flex gap-2 bg-card p-2 rounded-lg border"
>
    <ChatButton/>
    <div class="!border-l pl-2">
        <RunButton />
    </div>
</Controls>
<Background variant={BackgroundVariant.Dots} gap={30} bgColor={"#151414"} />