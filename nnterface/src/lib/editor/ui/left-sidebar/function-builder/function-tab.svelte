<script lang="ts">
    import CodeEditor from "./code-editor.svelte";
    import * as Dialog from "$lib/components/ui/dialog";
    import { SquarePen, Plus, Trash2, Check, X } from "lucide-svelte";
    import { createEmptyNode } from "$lib/editor/flow/utils";
    import {
        modelSelector,
        defaultFunctions,
    } from "@/lib/editor/handlers/states.svelte";

    type FunctionBlock = {
        functionName: string;
        inputs: string[];
        code: string;
        deletable: boolean;
    };

    let open = $state(false);
    let openIndex = $state(-1);
    let isDeleteMode = $state(false);
    let isEditMode = $state(false);
    let selectedForDeletion = $state<number[]>([]);

    const toggleDeleteMode = () => {
        isEditMode = false;
        isDeleteMode = !isDeleteMode;
    };

    const toggleEditMode = () => {
        isDeleteMode = false;
        isEditMode = !isEditMode;
    };

    const toggleDeleteSelection = (index: number) => {
        const position = selectedForDeletion.indexOf(index);
        if (position === -1) {
            selectedForDeletion = [...selectedForDeletion, index];
        } else {
            selectedForDeletion = selectedForDeletion.filter(
                (i) => i !== index,
            );
        }
    };

    const confirmDelete = () => {
        // Sort in descending order to avoid index shifting issues
        selectedForDeletion
            .sort((a, b) => b - a)
            .forEach((index) => {
                defaultFunctions.functions.splice(index, 1);
            });
        selectedForDeletion = [];
        isDeleteMode = false;
    };

    const cancelDelete = () => {
        selectedForDeletion = [];
        isDeleteMode = false;
    };

    const editFunction = (index: number) => {
        openIndex = index;
        open = true;
        isEditMode = false;
    };

    const onDragStart = (event: DragEvent, functionBlock: FunctionBlock) => {
        if (!event.dataTransfer) return;

        const newNode = createEmptyNode("function");
        newNode.data = { ...newNode.data, ...functionBlock };

        modelSelector.draggedType = newNode;
        event.dataTransfer.effectAllowed = "move";
    };

    const handleClose = () => {
        open = false;
        isEditMode = false;
        openIndex = -1;
    };

    const getFunctionCardClasses = (index: number, func: FunctionBlock) => {
        const baseClasses = "p-2 bg-ui-2 text-left border rounded transition-colors";
        const hoverClass = func.deletable ? 'hover:bg-ui-3' : '';
        const cursorClass = !isDeleteMode && !isEditMode ? 'cursor-grab' : 'cursor-pointer';
        const selectedClass = selectedForDeletion.includes(index) ? 'border-red-500' : '';
        const disabledClass = (isDeleteMode && !func.deletable) || 
            (isEditMode && func !== defaultFunctions.functions[openIndex]) ? 'bg-ui-2/30' : '';
        
        return `${baseClasses} ${hoverClass} ${cursorClass} ${selectedClass} ${disabledClass}`.trim();
    };
</script>

{#snippet menuButtons(isDeleteMode: boolean, isEditMode: boolean)}
    {#if isDeleteMode}
        <button class="p-1 text-green-600" onclick={confirmDelete}>
            <Check class="h-4 w-4" />
        </button>
        <button class="p-1 text-red-600" onclick={cancelDelete}>
            <X class="h-4 w-4" />
        </button>
    {:else}
        <button
            class="p-1 {isEditMode ? 'bg-ui-2' : 'hover:bg-ui-2'}"
            onclick={toggleEditMode}
        >
            <SquarePen class="h-4 w-4" />
        </button>
        <button
            class="p-1 {isDeleteMode ? 'bg-ui-2' : 'hover:bg-ui-2'}"
            onclick={toggleDeleteMode}
        >
            <Trash2 class="h-4 w-4" />
        </button>
        <button
            class="p-1 hover:bg-ui-2"
            onclick={() => {
                openIndex = -1;
                open = true;
            }}
        >
            <Plus class="h-4 w-4" />
        </button>
    {/if}
{/snippet}

<Dialog.Root 
    bind:open 
    onOpenChange={(isOpen) => !isOpen && handleClose()}
>
    <div class="flex justify-between items-center mb-2 py-1.5">
        <span class="text-sm">Functions</span>

        <div class="flex gap-3">
            {@render menuButtons(isDeleteMode, isEditMode)}
        </div>
    </div>

    <Dialog.Content class="max-w-[50%]">
        <CodeEditor index={openIndex} bind:open />
    </Dialog.Content>

    <div class="grid grid-cols-2 gap-3">
        {#each defaultFunctions.functions as func, index}
            <button
                class={getFunctionCardClasses(index, func)}
                draggable={!isDeleteMode && !isEditMode}
                ondragstart={(event) =>
                    !isDeleteMode &&
                    !isEditMode &&
                    onDragStart(event, defaultFunctions.functions[index])}
                onclick={() => {
                    if (isDeleteMode && func.deletable) toggleDeleteSelection(index);
                    if (isEditMode) editFunction(index);
                }}
            >
                <div class="flex justify-between items-center">
                    <span class="truncate">{func.functionName}</span>
                    {#if isDeleteMode && func.deletable && selectedForDeletion.includes(index)}
                        <div class="w-3 h-3 rounded-full bg-red-500"></div>
                    {/if}
                </div>
            </button>
        {/each}
    </div>
</Dialog.Root>
