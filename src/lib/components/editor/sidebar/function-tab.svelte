<script lang="ts">
    import CodeEditor from "../utils/code-editor.svelte";
    import * as Dialog from "$lib/components/ui/dialog";
    import { Pencil } from "lucide-svelte";
    import { getContext } from "svelte";
    import { createEmptyNode } from "$lib/components/editor/flow-utils";
    import { writable, type Writable } from "svelte/store";

    type FunctionBlock = {
        functionName: string;
        inputs: string[];
        code: string;
    };

    const type: Writable<Node | null> = getContext("type");

    let open: boolean = false;

    let openIndex: number = -1;

    const functions: Writable<FunctionBlock[]> = writable([
        {
            functionName: "Add",
            inputs: ["x", "y"],
            code: "return x + y",
        },
        {
            functionName: "Subtract",
            inputs: ["x", "y"],
            code: "return x - y",
        },
        {
            functionName: "Multiply",
            inputs: ["x", "y"],
            code: "return x * y",
        },
        {
            functionName: "Divide",
            inputs: ["x", "y"],
            code: "return x / y",
        },
    ]);

    const onDragStart = (event: DragEvent, functionBlock: FunctionBlock) => {
        if (event.dataTransfer) {
            let newNode: Node = createEmptyNode("function");
            newNode.data = { ...newNode.data, ...functionBlock };
            type.set(newNode);
            event.dataTransfer.effectAllowed = "move";
        }
    };
</script>

<Dialog.Root bind:open>
    <Dialog.Content class="max-w-[750px]">
        <CodeEditor {functions} index={openIndex} bind:open />
    </Dialog.Content>
    <div class="block-container">
        {#each $functions as f, index}
            <div>
                <button
                    class="my-3 p-2 w-20 h-10 bg-secondary border rounded-md"
                    draggable="true"
                    on:dragstart={(event) => onDragStart(event, f)}
                >
                    {f.functionName}
                </button>
                <Dialog.Trigger on:click={() => { openIndex = index }}>
                    <button>
                        <Pencil class="h-4 w-4" />
                    </button>
                </Dialog.Trigger>
            </div>
        {/each}
    </div>


    <Dialog.Trigger on:click={() => { openIndex = -1 }}>
        <button>
            <Pencil class="h-4 w-4" />
        </button>
    </Dialog.Trigger>
</Dialog.Root>

<style>
    .block-container {
        display: flex;
        flex-direction: column;
    }
</style>
