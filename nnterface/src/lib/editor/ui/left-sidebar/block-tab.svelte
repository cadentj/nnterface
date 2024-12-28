<script lang="ts">
    import type { Node } from "@xyflow/svelte";
    import { createEmptyNode } from "$lib/editor/flow/utils";
    import { modelSelector, editor } from "@/lib/editor/handlers/states.svelte";
    import FunctionTab from "./function-builder/function-tab.svelte";
    import { Separator } from "$lib/components/ui/separator/index.js";

    export type BlockGroup = {
        title: string;
        blocks: string[];
    };

    let { blockGroups }: { blockGroups: BlockGroup[] } = $props();

    const contexts: string[] = ["run", "batch", "loop"];

    const onDragStart = (event: DragEvent, name: string) => {
        if (!event.dataTransfer) return;

        const newNode = createEmptyNode(name);
        event.dataTransfer.setData("nodeType", name);

        if (contexts.includes(newNode.type)) {
            newNode.data.variant = "context";
            newNode.height = 150;
            newNode.width = 250;
        }

        modelSelector.draggedType = newNode as Node;
        event.dataTransfer.effectAllowed = "move";
    };

    function capitalizeFirstLetter(val: string) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }
</script>

<div class="p-6">
    {#each blockGroups as group}
        <div class="mb-4">
            <small>{group.title}</small>
            <div class="grid grid-cols-2 gap-3 mt-2">
                {#each group.blocks as block}
                    <button
                        class="p-2 bg-ui-2 text-left border rounded
                            {block === 'chat' && editor.chatNodeExists ? 'opacity-50' : 'cursor-grab'}"
                        draggable={!(block === "chat" && editor.chatNodeExists)}
                        ondragstart={(event) => onDragStart(event, block)}
                        disabled={block === "chat" && editor.chatNodeExists}
                    >
                        {capitalizeFirstLetter(block)}
                    </button>
                {/each}
            </div>
        </div>
    {/each}
</div>

<Separator />
<div class="p-6">
    <FunctionTab />
</div>
