<script lang="ts">
    import {
        Controls,
        Background,
        BackgroundVariant,
    } from "@xyflow/svelte";
    import RunButton from "./run-button.svelte";
    import ChatButton from "./chat-button.svelte";
    import ProximityButton from "./proximity-button.svelte";
    import SnapButton from "./snap-button.svelte";
</script>

<Controls
    orientation="vertical"
    position="bottom-left"
    class="flex gap-2 bg-card p-2 rounded-lg border"
    showZoom={false}
>
    <ProximityButton/>
    <SnapButton/>
    <ChatButton/>
    <div class="!border-t pt-2">
        <RunButton />
    </div>
</Controls>
<Background variant={BackgroundVariant.Dots} gap={30} bgColor={"#100F0F"} />