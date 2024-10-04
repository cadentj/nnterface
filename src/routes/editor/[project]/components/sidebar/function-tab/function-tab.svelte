<script lang="ts">
    import CodeEditor from "./code-editor.svelte";
    import * as Dialog from "$lib/components/ui/dialog";
    import { Pencil, Trash2 } from "lucide-svelte";
    import { getContext } from "svelte";
    import { createEmptyNode } from "../../utils";
    import { loadFunctions } from "../../defaults";
    import { writable, type Writable } from "svelte/store";

    type FunctionBlock = {
        functionName: string;
        inputs: string[];
        code: string;
        deletable: boolean;
    };

    const type: Writable<Node | null> = getContext("type");
    const project: string = getContext("project");

    const defaultFunctions: FunctionBlock[] = loadFunctions(project);

    let open: boolean = false;
    let openIndex: number = -1;

    const functions: Writable<FunctionBlock[]> = writable([
        {
            functionName: "Add",
            inputs: ["x", "y"],
            code: "return x + y",
            deletable: false,
        },
        {
            functionName: "Subtract",
            inputs: ["x", "y"],
            code: "return x - y",
            deletable: false,
        },
        {
            functionName: "Multiply",
            inputs: ["x", "y"],
            code: "return x * y",
            deletable: false,
        },
        {
            functionName: "Divide",
            inputs: ["x", "y"],
            code: "return x / y",
            deletable: false,
        },
        {
            functionName: "Decode",
            inputs: ["logits"],
            code: "return logits[:,-1,:].softmax(-1).argmax(-1).item()",
            deletable: false,
        },
        ...defaultFunctions,
    ]);

    const deleteFunction = (index: number) => {
        functions.update((fns) => {
            fns.splice(index, 1);
            return fns;
        });
    };

    const onDragStart = (event: DragEvent, functionBlock: FunctionBlock) => {
        if (event.dataTransfer) {
            let newNode: Node = createEmptyNode("function");
            newNode.data = { ...newNode.data, ...functionBlock };
            type.set(newNode);
            event.dataTransfer.effectAllowed = "move";
        }
    };
</script>

<small>Functions</small>
<Dialog.Root bind:open>
    <Dialog.Content class="max-w-[750px]">
        <CodeEditor {functions} index={openIndex} bind:open />
    </Dialog.Content>
    <div class="flex flex-col mt-2 gap-3 mb-3">
        {#each $functions as f, index}
            <div
                class="flex p-2 h-10 bg-ui-2 px-5 justify-between items-center rounded-md"
            >
                <button
                    class=""
                    draggable="true"
                    on:dragstart={(event) => onDragStart(event, f)}
                >
                    {f.functionName}
                </button>

                <div>
                    {#if f.deletable}
                        <Dialog.Trigger
                            on:click={() => {
                                openIndex = index;
                            }}
                        >
                            <button>
                                <Pencil class="h-4 w-4" />
                            </button>
                        </Dialog.Trigger>
                        <button
                            on:click={() => {
                                deleteFunction(index);
                            }}
                        >
                            <Trash2 class="h-4 w-4 ml-2" />
                        </button>
                    {/if}
                </div>
            </div>
        {/each}
    </div>

    <Dialog.Trigger
        on:click={() => {
            openIndex = -1;
        }}
    >
        <button>
            <Pencil class="h-4 w-4" />
        </button>
    </Dialog.Trigger>
</Dialog.Root>
