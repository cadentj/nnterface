<script lang="ts">
    import { useSvelteFlow } from "@xyflow/svelte";
    import { useNodes, type Node } from "@xyflow/svelte";

    import { useDnD } from "../flow-utils";
    const { screenToFlowPosition } = useSvelteFlow();

    const nodes = useNodes();
    const type = useDnD();

    function onDragOver(event: DragEvent) {
        event.preventDefault();

        if (event.dataTransfer) {
            event.dataTransfer.dropEffect = "move";
        }
    }

    function onDrop(event: DragEvent) {
        event.preventDefault();

        if (!$type) {
            return;
        }

        const position = screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
        });

        const numNodes = ($nodes.length).toString();

        const newNode = {
            ...$type,
            id: numNodes,
            position: position,
            origin: [0, 0],
        } satisfies Node;

        $nodes = [...$nodes, newNode];
    }
</script>

<div on:dragover={onDragOver} on:drop={onDrop} class="w-full h-full" role="region">
    <slot />
</div>
