<script lang="ts">
    import type { NodeProps } from "@xyflow/svelte";
    import CodeMirror from "svelte-codemirror-editor";
    import { python } from "@codemirror/lang-python";
    import ContextNode from "../context-node.svelte";
    import * as Dialog from "$lib/components/ui/dialog";
    import { Button } from "$lib/components/ui/button";
    import { Pencil } from "lucide-svelte";
    import Badges from "./badges.svelte";
    import { oneDark } from "@codemirror/theme-one-dark";

    import { mode } from "mode-watcher";

    type $$Props = NodeProps;

    export let id: $$Props["id"] = undefined;
    export let data: $$Props["data"] = undefined;
    export let value: string = data.value;
    export let selected: $$Props["selected"] = undefined;

    let badges: string[] = [];

    $$restProps;
</script>

<ContextNode {selected} {id}>
    <Dialog.Root>
        <Dialog.Content class="max-w-[750px]">
            <Dialog.Header>
                <Dialog.Title>Function Editor</Dialog.Title>
                <Dialog.Description>
                    Write code to be executed as a node in the editor to the
                    left. Specify node inputs to the right.
                </Dialog.Description>
            </Dialog.Header>
            <div class="grid grid-cols-3 gap-2">
                <div class="col-span-2">
                    <small>Code</small>
                    <CodeMirror
                        bind:value
                        styles={{
                            "&": {
                                maxWidth: "100%",
                                height: "35rem",
                            },
                        }}
                        lang={python()}
                    />
                </div>
                <div class="col-span-1">
                    <small>Inputs ({badges.length}/5)</small>
                    <Badges bind:badges />
                </div>
            </div>
        </Dialog.Content>
        <div style="justify-content: space-between; display: flex;">
            {data.label}
            <Dialog.Trigger>
                <button>
                    <Pencil class="h-4 w-4" />
                </button>
            </Dialog.Trigger>
        </div>
    </Dialog.Root>
</ContextNode>
