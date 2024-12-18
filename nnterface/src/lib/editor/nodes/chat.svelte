<script lang="ts">
    import { type NodeProps, Position, Handle } from "@xyflow/svelte";
    import { MessageSquare } from "lucide-svelte";

    let { data, ...restProps}: NodeProps = $props();
</script>

<div class="justify-between flex !bg-green-950 !border-green-500 opacity-80">
    Chat
    <button>
        <MessageSquare class="h-5 w-5"/>
    </button>

    <Handle type="source" position={Position.Right}/>
</div>
