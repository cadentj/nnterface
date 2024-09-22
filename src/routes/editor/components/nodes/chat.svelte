<script lang="ts">
    import { type NodeProps, Position } from "@xyflow/svelte";
    import { MessageSquare } from "lucide-svelte";
    import Handle from "../flow/handle.svelte";

    type $$Props = NodeProps;

    export let type: $$Props["type"];
    export let data: $$Props["data"];

    $$restProps;
</script>

<div class="block py-2 px-3 flex justify-between items-center">
    Chat
    <button>
        <MessageSquare class="h-5 w-5"/>
    </button>

    <Handle label={type} type="target" position={Position.Left}/>
</div>
