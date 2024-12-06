<script lang="ts">
    import type { Node } from "@xyflow/svelte";
    import { createEmptyNode } from "$lib/editor/flow/utils";
    import { modelSelector } from "$lib/editor/contexts/model-selector.svelte";
    import type { BlockGroup } from "$lib/editor/types/blocks";

    let { blockGroups }: { blockGroups: BlockGroup[] } = $props();

    // TEMPORARY
    const contexts: string[] = ["run", "batch", "loop"];

    const onDragStart = (event: DragEvent, name: string) => {
        if (event.dataTransfer) {
            let newNode: Node = createEmptyNode(name);

            event.dataTransfer.setData("nodeType", name);

            if (contexts.includes(newNode.type)) {
                newNode.data.variant = "context";
                newNode.height = 200;
                newNode.width = 250;
            }
            
            modelSelector.draggedType = newNode;

            event.dataTransfer.effectAllowed = "move";
        }
    };
</script>

<div>
    {#each blockGroups as group}
        <div class='mb-2'>
            {group.title}
            <div class="grid grid-cols-2 gap-4 pt-2">
                {#each group.blocks as block, index}
                    <button
                        class="p-2 h-10 bg-ui-2 border rounded-md"
                        style="grid-column-start: {(index % 2) + 1};"
                        draggable="true"
                        ondragstart={(event) => onDragStart(event, block)}
                    >
                        {block}
                    </button>
                {/each}
            </div>
        </div>
    {/each}
</div>