<script lang="ts">
    import CodeEditor from "../utils/code-editor.svelte";
    import * as Dialog from "$lib/components/ui/dialog";
    import { Pencil } from "lucide-svelte";
    import { getContext } from "svelte";
    import { createEmptyNode } from "$lib/components/editor/util"
    import { writable, type Writable } from "svelte/store";

    type FunctionBlock = {
        label: string;
        inputs: string[];
        code: string;
    };

    const type: Writable<Node | null> = getContext("type");

    const functions: Writable<FunctionBlock[]> = writable([
        {
            label: "Add",
            inputs: ["a", "b"],
            code: "return a + b",
        },
    ]);

    export const save = () => {
        functions.update((fns) => {
            fns.push({
                label: "New Function",
                inputs: [],
                code: "",
            });
            return fns;
        });
    };

    const onDragStart = (event: DragEvent, functionBlock: FunctionBlock) => {
		if (event.dataTransfer) {
			let newNode: Node = createEmptyNode("function"); 
            newNode.data = functionBlock;
			type.set(newNode);
			event.dataTransfer.effectAllowed = "move";
		}
	};
</script>

<Dialog.Root>
    <Dialog.Content class="max-w-[750px]">
        <CodeEditor {save} />
    </Dialog.Content>
    <div class="block-container">
        {#each $functions as f}
            <button
                class="my-3 p-2 h-10 bg-secondary border rounded-md"
                draggable="true"
                on:dragstart={(event) => onDragStart(event, f)}
            >
                {f.label}
            </button>
        {/each}
    </div>
    <Dialog.Trigger>
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
