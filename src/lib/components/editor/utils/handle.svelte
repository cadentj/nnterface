<script lang="ts">
    import { Handle, Position } from "@xyflow/svelte";

    import { getContext, onDestroy } from "svelte";

    export let position: Position;
    export let type: "source" | "target";
    export let label: string;

    const connectionType = getContext("connection");

    let isColored: boolean = false;

    const unsubscribe = connectionType.subscribe((connections) => {
        connections = (connections == null ? [] : connections);

        console.log(label, connections, connections.includes(label));

        isColored = connections.includes(label);
    });

    onDestroy(() => {
        unsubscribe();
    });
</script>

<Handle {type} {position} class={isColored ? "!bg-green-500" : "!bg-red-500"}></Handle>
