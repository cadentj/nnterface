<script lang="ts">
    import { Position, useSvelteFlow } from "@xyflow/svelte";
    import Handle from "@/lib/editor/flow/handle.svelte";
    import type { InputNodeProps } from "$lib/editor/types/nodes";
    import { Textarea } from "$lib/components/ui/textarea";

    let {
        id, 
        data,
        ...restProps
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
            class="resize-none"
        />
    </div>

    <Handle type="source" label="input" position={Position.Right}/>
</div>
