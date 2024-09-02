<script lang="ts">
    import {
        Handle,
        Position,
        type NodeProps,
        useSvelteFlow,
    } from "@xyflow/svelte";

    import TextCursorInput from "lucide-svelte/icons/text-cursor-input";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Dialog from "$lib/components/ui/dialog";
    import { Textarea } from "$lib/components/ui/textarea";

    type $$Props = NodeProps;

    export let id: $$Props["id"];
    export let data: $$Props["data"];

    const { updateNodeData } = useSvelteFlow();

</script>

<div class="block px-3 py-5">
    <Dialog.Root>
        <Dialog.Content>
            <Dialog.Title>Prompt</Dialog.Title>
            <Dialog.Description>Interventions will only be executed on the highlighted tokens.</Dialog.Description>
            <Textarea
                value={data.text}
                on:input={(evt) =>
                    updateNodeData(id, { text: evt.currentTarget.value })}
            />
        </Dialog.Content>

        <div class="header">
            <div class="label">Prompt</div>
            <Dialog.Trigger>
                <Button variant="ghost" size="icon">
                    <TextCursorInput class="h-4 w-4" />
                </Button>
            </Dialog.Trigger>
        </div>
        <div>
            <Textarea
                value={data.text}
                on:input={(evt) =>
                    updateNodeData(id, { text: evt.currentTarget.value })}
                class="resize-none"
            />
    </div>
        <Handle type="source" position={Position.Bottom} />
    </Dialog.Root>
</div>

<style>
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .label {
        font-size: 12px;
        margin-bottom: 5px;
    }
</style>
