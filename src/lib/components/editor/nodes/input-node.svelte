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
    import NodeMenu from "./node-menu.svelte";

    type $$Props = NodeProps;

    export let id: $$Props["id"];
    export let data: $$Props["data"];

    const { updateNodeData } = useSvelteFlow();

    $$restProps;
</script>

<NodeMenu {id} nodeType={"block py-3"}>
    <Dialog.Root>
        <Dialog.Content>
            <Dialog.Title>Prompt</Dialog.Title>
            <Dialog.Description
                >Interventions will only be executed on the highlighted tokens.</Dialog.Description
            >
            <Textarea
                value={data.text}
                on:input={(evt) =>
                    updateNodeData(id, { text: evt.currentTarget.value })}
            />
        </Dialog.Content>

        <div style="justify-content: space-between; display: flex;" class="mb-2">
            Prompt
            <Dialog.Trigger>
                <button>
                    <TextCursorInput class="h-4 w-4" />
                </button>
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
</NodeMenu>