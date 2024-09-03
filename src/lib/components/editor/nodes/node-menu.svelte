<script lang="ts">
    import { useNodes } from "@xyflow/svelte";
    import * as ContextMenu from "$lib/components/ui/context-menu";
    import "../styles/nodes.css";
    
    export let id: string = "";
    export let nodeType: string = "";

    const nodes = useNodes();

    function swap(id: string, direction: "forward" | "backward") {
        for (let i = 0; i < $nodes.length; i++) {
            if ($nodes[i].id === id) {
                if (direction === "forward" && i < $nodes.length - 1) {
                    [$nodes[i], $nodes[i + 1]] = [$nodes[i + 1], $nodes[i]];
                } else if (direction === "backward" && i > 0) {
                    [$nodes[i], $nodes[i - 1]] = [$nodes[i - 1], $nodes[i]];
                }
                return;
            }
        }
    }
</script>

<ContextMenu.Root>
    <ContextMenu.Trigger class={nodeType}>

        <slot />

        <ContextMenu.Content>
            <ContextMenu.Item on:click={() => console.log("forward")}
                >Move Forward</ContextMenu.Item
            >
            <ContextMenu.Item on:click={() => console.log("backward")}
                >Move Back</ContextMenu.Item
            >
        </ContextMenu.Content>
    </ContextMenu.Trigger>
</ContextMenu.Root>
