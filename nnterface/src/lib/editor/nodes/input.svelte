<script lang="ts">
    import { Position, Handle, useSvelteFlow } from "@xyflow/svelte";
    import type { InputNodeProps } from "$lib/editor/types/nodes";
    import { Textarea } from "$lib/components/ui/textarea";

    const { updateNodeData } = useSvelteFlow();

    let { id, data }: InputNodeProps = $props();

</script>

<div class="node !min-w-52 !max-w-52 p-3">
    <div class="mb-2 ">
        Prompt
    </div>
    <div>
        <Textarea
                value={data.text}
                on:input={(evt) =>
                    updateNodeData(id, { text: evt.currentTarget.value })}
                class="resize-none bg-ui-3 nodrag"
            />
    </div>

    <Handle type="source" position={Position.Right} />
</div>


