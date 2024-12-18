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

<div class="node justify-between flex p-3 !bg-green-950 !border-green-500 opacity-80">
    Chat
    <button>
        <MessageSquare class="h-5 w-5"/>
    </button>

    <Handle type="source" position={Position.Right}/>
</div>
