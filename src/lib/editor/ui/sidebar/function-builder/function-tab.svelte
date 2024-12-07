<script lang="ts">
    import CodeEditor from "./code-editor.svelte";
    import * as Dialog from "$lib/components/ui/dialog";
    import { Pencil, Trash2 } from "lucide-svelte";
    import { createEmptyNode } from "$lib/editor/flow/utils";
    import { modelSelector } from "@/lib/editor/handlers/states.svelte";
    import { defaultFunctions } from "./default-functions.svelte";

    type FunctionBlock = {
        functionName: string;
        inputs: string[];
        code: string;
        deletable: boolean;
    };

    let open = $state(false);
    let openIndex = $state(-1);

    const deleteFunction = (index: number) => {
        defaultFunctions.update((fns) => {
            fns.splice(index, 1);
            return fns;
        });
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
    <Dialog.Content class="max-w-[750px]">
        <CodeEditor {defaultFunctions} index={openIndex} bind:open />
    </Dialog.Content>
    <div class="flex flex-col mt-2 gap-3 mb-1">
        {#each defaultFunctions as _, index}
            <div
                class="flex p-2 h-10 bg-ui-2 px-5 justify-between items-center rounded-md"
            >
                <button
                    class=""
                    draggable="true"
                    ondragstart={(event) => onDragStart(event, defaultFunctions[index])}
                >
                    {defaultFunctions[index].functionName}
                </button>

                <div>
                    {#if defaultFunctions[index].deletable}
                        <Dialog.Trigger
                            on:click={() => {
                                openIndex = index;
                            }}
                        >
                            <Pencil class="h-4 w-4" />
                        </Dialog.Trigger>
                        <button
                            onclick={() => {
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
</Dialog.Root>
