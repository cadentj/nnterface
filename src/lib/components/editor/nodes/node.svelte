<script lang="ts">
    import * as ContextMenu from "$lib/components/ui/context-menu";
    import "../styles/nodes.css";


    export let id: string = "";
    export let nodeType: string = "";
    export let selected: boolean = false;

    $: borderStyle = selected ? " !border-current" : " !default-border";

    import { moveNode } from "../flow";

    const swap = () => {
        // $nodes = moveNode($nodes, "4", "backward");
        moveNode("4", "backward");
    };

</script>

<ContextMenu.Root>
    <ContextMenu.Trigger class={nodeType + borderStyle}>
        <slot />

        <ContextMenu.Content>
            <ContextMenu.Item on:click={swap}
                >Move Forward</ContextMenu.Item
            >
            <ContextMenu.Item on:click={() => console.log("clicked")}
                >Move Back</ContextMenu.Item
            >
        </ContextMenu.Content>
    </ContextMenu.Trigger>
</ContextMenu.Root>

