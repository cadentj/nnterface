<script lang="ts">
    import { Position, useSvelteFlow } from "@xyflow/svelte";
    import type { InputNodeProps } from "$lib/components/types/nodes";

    import Handle from "../utils/handle.svelte";

    import TextCursorInput from "lucide-svelte/icons/text-cursor-input";
    import * as Dialog from "$lib/components/ui/dialog";
    import { Textarea } from "$lib/components/ui/textarea";

    type $$Props = InputNodeProps;

    export let id: $$Props["id"];
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

    <Handle type="source" position={Position.Right} label={data.label}/>
</div>
