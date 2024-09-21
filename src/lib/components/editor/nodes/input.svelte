<script lang="ts">
    import { Position, useSvelteFlow } from "@xyflow/svelte";
    import type { InputNodeProps } from "$lib/components/types/nodes";

    import Handle from "../utils/handle.svelte";
    import { Textarea } from "$lib/components/ui/textarea";

    type $$Props = InputNodeProps;

    export let id: $$Props["id"];
    export let type: $$Props["type"];
    export let data: $$Props["data"];

    const { updateNodeData } = useSvelteFlow();

    $$restProps;
</script>

<div class="block p-2">
    <div style="justify-content: space-between; display: flex;" class="mb-2">
        Prompt
    </div>
    <div>
        <Textarea
            value={data.text}
            on:input={(evt) =>
                updateNodeData(id, { text: evt.currentTarget.value })}
            class="resize-none"
        />
    </div>

    <Handle type="source" position={Position.Right} label={type}/>
</div>
