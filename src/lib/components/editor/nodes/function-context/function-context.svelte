<script lang="ts">
    import type { NodeProps } from "@xyflow/svelte";

    import CodeMirror from "svelte-codemirror-editor";
    import { python } from "@codemirror/lang-python";

    import ContextNode from "../context-node.svelte";

    let value = "";

    import * as Dialog from "$lib/components/ui/dialog";
    import { Button } from "$lib/components/ui/button";
    import { Pencil } from "lucide-svelte";

    import Badges from "./badges.svelte";

    type $$Props = NodeProps;

    export let data: $$Props["data"] = undefined;
    export let selected: $$Props["selected"] = undefined;
</script>

<div class="border rounded-md block">
    <ContextNode {selected}>
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
    
            <div class="header">
                <div style="padding: 10px">{data.label}</div>
                <Dialog.Trigger>
                    <Button size="icon" variant="ghost">
                        <Pencil class="h-4 w-4" />
                    </Button>
                </Dialog.Trigger>
            </div>
        </Dialog.Root>
    </ContextNode>
</div>

<style>
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .block {
        height: 100%;
        background-color: hsl(var(--node-background));
        border-radius: var(--radius);
    }
</style>
