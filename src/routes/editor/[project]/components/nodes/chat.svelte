<script lang="ts">
    import { type NodeProps, Position } from "@xyflow/svelte";
    import { MessageSquare } from "lucide-svelte";
    import Handle from "../flow/handle.svelte";

    type $$Props = NodeProps;

    export let type: $$Props["type"];
    export let data: $$Props["data"];

    $$restProps;
</script>

<div class="node py-2 px-3 justify-between flex !bg-green-950 !border-green-500 opacity-80">
    Chat
    <button>
        <MessageSquare class="h-5 w-5"/>
    </button>

    <Handle label={type} type="source" position={Position.Right}/>
</div>
