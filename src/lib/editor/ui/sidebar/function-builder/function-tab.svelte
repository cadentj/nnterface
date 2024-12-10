<script lang="ts">
    import CodeEditor from "./code-editor.svelte";
    import * as Dialog from "$lib/components/ui/dialog";
    import { Pencil, Trash2 } from "lucide-svelte";
    import { createEmptyNode } from "$lib/editor/flow/utils";
    import { modelSelector, defaultFunctions } from "@/lib/editor/handlers/states.svelte";

    type FunctionBlock = {
        functionName: string;
        inputs: string[];
        code: string;
        deletable: boolean;
    };

    let open = $state(false);
    let openIndex = $state(-1);

    const deleteFunction = (index: number) => {
        defaultFunctions.functions.splice(index, 1);
    };

    const editFunction = (index: number) => {
        openIndex = index;
        open = true;
    };

    const onDragStart = (event: DragEvent, functionBlock: FunctionBlock) => {

        if (event.dataTransfer) {
            let newNode: Node = createEmptyNode("function");
            newNode.data = { ...newNode.data, ...functionBlock };
            modelSelector.draggedType = newNode;
            event.dataTransfer.effectAllowed = "move";
        }
    };
</script>

<Dialog.Root bind:open>
    <div class="flex justify-between items-center mb-2">
        <small>Functions</small>
        <Dialog.Trigger
            onclick={() => {
                openIndex = -1;
            }}
        >
            +
        </Dialog.Trigger>
    </div>
    <Dialog.Content class="max-w-[50%]">
        <CodeEditor index={openIndex} bind:open={open} />
    </Dialog.Content>
    <div class="flex flex-col mt-2 gap-3 mb-1">
        {#each defaultFunctions.functions as _, index}
            <div
                class="flex p-2 h-10 bg-ui-2 px-5 justify-between items-center rounded-md"
            >
                <button
                    class="h-full"
                    draggable="true"
                    ondragstart={(event) => onDragStart(event, defaultFunctions.functions[index])}
                >
                    {defaultFunctions.functions[index].functionName}
                </button>
                <div>   
                    {#if defaultFunctions.functions[index].deletable}
                        <button onclick={() => editFunction(index)}>
                            <Pencil class="h-4 w-4" />
                        </button>
                        <button
                            onclick={() => deleteFunction(index)}
                        >
                            <Trash2 class="h-4 w-4 ml-2" />
                        </button>
                    {/if}
                </div>
            </div>
        {/each}
    </div>
</Dialog.Root>
