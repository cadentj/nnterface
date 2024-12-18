<script lang="ts">
    import { Position, useSvelteFlow, Handle } from "@xyflow/svelte";
    import type { InputNodeProps } from "$lib/editor/types/nodes";
    import { Textarea } from "$lib/components/ui/textarea";

    let {
        id, 
        data
    }: InputNodeProps = $props();

    const { updateNodeData } = useSvelteFlow();

</script>

<div class="node p-2">
    <div style="justify-content: space-between; display: flex;" class="mb-2">
        Prompt
    </div>
    <div>
        <Textarea
            value={data.text}
            on:input={(evt) =>
                updateNodeData(id, { text: evt.currentTarget.value })}
            class="resize-none bg-ui-3"
        />
    </div>

    <Handle type="source" position={Position.Right}/>
</div>