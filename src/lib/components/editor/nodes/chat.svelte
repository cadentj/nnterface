<script lang="ts">
    import { type NodeProps, Position } from "@xyflow/svelte";
    import { MessageSquare } from "lucide-svelte";
    import Handle from "../utils/handle.svelte";

    type $$Props = NodeProps;

    export let data: $$Props["data"];

    $$restProps;
</script>

<div class="block py-2 px-3 flex justify-between items-center">
    Chat
    <button>
        <MessageSquare class="h-5 w-5"/>
    </button>

    <Handle label={data.label} type="target" position={Position.Left}/>
</div>
