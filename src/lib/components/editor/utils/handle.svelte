<script lang="ts">
    import { Handle, Position } from "@xyflow/svelte";
    import type { Writable } from "svelte/store";
    import { getContext, onDestroy } from "svelte";

    export let position: Position;
    export let type: "source" | "target";
    export let label: string;

    const connectionType: Writable<string[] | null> = getContext("connection");

    let isColored: boolean = false;

    const unsubscribe = connectionType.subscribe((connections) => {
        connections = connections == null ? [] : connections;
        isColored = connections.includes(label);
    });

    onDestroy(() => {
        unsubscribe();
    });

</script>

<Handle {type} {position} class={isColored ? "!bg-green-500 h-3 w-3 rounded-full" : "bg-current h-3 w-3 rounded-full"}>
    <slot/>
</Handle>
