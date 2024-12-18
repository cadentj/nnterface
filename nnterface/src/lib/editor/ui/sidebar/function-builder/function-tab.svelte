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

    function createDragPreview(functionBlock: FunctionBlock) {
        const dragPreview = document.createElement('div');
        dragPreview.className = 'p-2 h-10 bg-ui-2 w-[10vw] border rounded flex items-center justify-center';
        dragPreview.textContent = functionBlock.functionName;
        document.body.appendChild(dragPreview);
        return dragPreview;
    }

    const onDragStart = (event: DragEvent, functionBlock: FunctionBlock) => {
        if (event.dataTransfer) {
            let newNode = createEmptyNode("function") as any;
            newNode.data = { ...newNode.data, ...functionBlock };
            modelSelector.draggedType = newNode;
            event.dataTransfer.effectAllowed = "move";
            
            const dragPreview = createDragPreview(functionBlock);
            event.dataTransfer.setDragImage(dragPreview, 0, 0);
            
            // Clean up the temporary element after drag starts
            setTimeout(() => {
                document.body.removeChild(dragPreview);
            }, 100);
        }
    };
</script>

<Dialog.Root bind:open>
    <div class="flex justify-between items-center">
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
                role="button"
                tabindex="0"
                class="flex p-2 h-10 bg-ui-2 px-5 justify-between items-center cursor-grab rounded"
                draggable="true"
                ondragstart={(event) => onDragStart(event, defaultFunctions.functions[index])}
            >
                {defaultFunctions.functions[index].functionName}
                <div class="flex items-center">   
                    {#if defaultFunctions.functions[index].deletable}
                        <button type="button" onclick={() => editFunction(index)}>
                            <Pencil class="h-4 w-4" />
                        </button>
                        <button 
                            type="button"
                            onclick={() => deleteFunction(index)}
                            class="ml-2"
                        >
                            <Trash2 class="h-4 w-4" />
                        </button>
                    {/if}
                </div>
            </div>
        {/each}
    </div>
</Dialog.Root>
