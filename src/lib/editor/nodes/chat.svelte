<script lang="ts">
    import { type NodeProps, Position, Handle } from "@xyflow/svelte";
    import { MessageSquare } from "lucide-svelte";

    let props: NodeProps = $props();
</script>

<div class="node py-2 px-3 justify-between flex !bg-green-950 !border-green-500 opacity-80">
    Chat
    <button>
        <MessageSquare class="h-5 w-5"/>
    </button>

    <Handle type="source" position={Position.Right}/>
</div>
