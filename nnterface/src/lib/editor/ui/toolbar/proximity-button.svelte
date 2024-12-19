<script lang="ts">
    import { ControlButton } from "@xyflow/svelte";
    import { PlugZap } from "lucide-svelte";
    import { editor } from "$lib/editor/handlers/states.svelte";

</script>


<ControlButton on:click={() => {editor.proximity = !editor.proximity}} class={editor.proximity ? "bg-ui-2" : ""}>
    <PlugZap  />
</ControlButton>

