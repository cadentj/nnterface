<script lang="ts">
    import {
        Handle,
        NodeResizer,
        Position,
        type NodeProps,
    } from "@xyflow/svelte";

    import CodeMirror from "svelte-codemirror-editor";
    import { python } from "@codemirror/lang-python";

    let value = "";

    import * as Dialog from "$lib/components/ui/dialog";
    import { Button } from "$lib/components/ui/button";
    import { Pencil } from "lucide-svelte";

    import Badges from "./badges.svelte";

    type $$Props = NodeProps;

    export let data: $$Props["data"] = undefined;
    export let selected: $$Props["selected"] = undefined;
</script>

<div>
    <NodeResizer
        minWidth={100}
        minHeight={30}
        isVisible={selected}
        handleStyle="border: 1px solid black; background-color: white"
    />
    <Dialog.Root>
        <Dialog.Content>
            <Dialog.Header>
                <Dialog.Title>Function Editor</Dialog.Title>
                <Dialog.Description>
                    Write your custom code here.
                </Dialog.Description>
                <Badges />
                <CodeMirror bind:value lang={python()} />
            </Dialog.Header>
        </Dialog.Content>

        <div class='header'>
            <div style="padding: 10px">{data.label}</div>
            <Dialog.Trigger>
                <Button size="icon" variant="ghost">
                    <Pencil class="h-4 w-4" />
                </Button>
            </Dialog.Trigger>
        </div>
    </Dialog.Root>

    <Handle type="target" position={Position.Left} />
    <Handle type="source" position={Position.Right} />
</div>

<style>
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>
