<script lang="ts">
    import { useSvelteFlow } from "@xyflow/svelte";
    import { useNodes, type Node } from "@xyflow/svelte";
    import { modelSelector } from "@/lib/editor/handlers/states.svelte";

    const { screenToFlowPosition } = useSvelteFlow();

    const nodes = useNodes();
    const type = $derived(modelSelector.draggedType);

    export function onDragOver(event: DragEvent) {
        event.preventDefault();

        if (event.dataTransfer) {
            event.dataTransfer.dropEffect = "move";
        }
    }

    export function onDrop(event: DragEvent) {
        event.preventDefault();

        if (!type) {
            return;
        }

        const position = screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
        });

        const nExistingType = $nodes.filter(node => node.type === type.type).length;

        const className = (variant: string) => {
            switch (variant) {
                case "context":
                    return "!pointer-events-none";
                default:
                    return "";
            }
        }

        const newNode = {
            ...type,
            id: `${type.type}` + (nExistingType + 1),
            position: position,
            origin: [0, 0],
            class: className(type.data.variant),
        } satisfies Node;

        $nodes = [...$nodes, newNode];
    }
</script>

<div></div>