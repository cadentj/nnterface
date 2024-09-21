<script lang="ts">
    import { getContext } from "svelte";
    import type { Writable } from "svelte/store";
    import type { Node } from "@xyflow/svelte";
    import { createEmptyNode } from "../flow-utils";

    import type { BlockGroup } from "$lib/components/types/blocks";

    const type: Writable<Node | null> = getContext("type");

    export let blockGroups: BlockGroup[];

    // TEMPORARY
    const contexts: string[] = ["run", "batch", "loop"];

    const onDragStart = (event: DragEvent, name: string) => {
        if (event.dataTransfer) {
            let newNode: Node = createEmptyNode(name);

            if (contexts.includes(newNode.type)) {
                newNode.data.variant = "context";
                newNode.height = 200;
                newNode.width = 250;
            }
            
            type.set(newNode);

            event.dataTransfer.effectAllowed = "move";
        }
    };
</script>

<div>
    {#each blockGroups as group}
        <div class='py-2'>
            <small>{group.title}</small>
            <div class="block-container grid grid-cols-2 gap-4 pt-2">
                {#each group.blocks as block, index}
                    <button
                        class="p-2 h-10 bg-ui-2 border rounded-md"
                        style="grid-column-start: {(index % 2) + 1};"
                        draggable="true"
                        on:dragstart={(event) => onDragStart(event, block)}
                    >
                        {block}
                    </button>
                {/each}
            </div>
        </div>
    {/each}
</div>

<style>
    .block-container {
        grid-auto-flow: dense;
    }
</style>
