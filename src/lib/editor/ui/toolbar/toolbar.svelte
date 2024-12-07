<script lang="ts">
    import {
        Controls,
        Background,
        BackgroundVariant,
    } from "@xyflow/svelte";
    import RunButton from "./run-button.svelte";

</script>

<Controls
    orientation="horizontal"
    position="bottom-center"
    class="flex gap-3 bg-card p-2 rounded-lg border"
>
    <RunButton/>
</Controls>
<Background variant={BackgroundVariant.Dots} gap={30} bgColor={"#151414"} />