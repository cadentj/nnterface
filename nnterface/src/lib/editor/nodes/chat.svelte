<script lang="ts">
    import { type NodeProps, Position, Handle } from "@xyflow/svelte";
    import { MessageSquare } from "lucide-svelte";
    import { onMount } from "svelte";
    import { editor } from "$lib/editor/handlers/states.svelte";

    let { data, ...restProps}: NodeProps = $props();

    onMount(() => {
        editor.chatNodeExists = true;
    });
</script>

<div class="node flex justify-between p-3 !bg-[#935992]/30 !border-[#935992]">
    Chat
    <button>
        <MessageSquare class="h-5 w-5"/>
    </button>

    <Handle type="source" position={Position.Right}/>
</div>
