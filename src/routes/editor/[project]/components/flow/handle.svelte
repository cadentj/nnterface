<script lang="ts">
    import { Handle, Position } from "@xyflow/svelte";
    import type { Writable } from "svelte/store";
    import { getContext, onDestroy } from "svelte";

    export let id: string = null;
    export let position: Position;
    export let type: "source" | "target";
    export let label: string;
    export let style: string | undefined = undefined;

    const connectionType: Writable<string[] | null> = getContext("connection");

    let isColored: boolean = false;

    const unsubscribe = connectionType.subscribe((connections) => {
        connections = connections == null ? [] : connections;
        isColored = connections.includes(label);
    });

    onDestroy(() => {
        unsubscribe();
    });

    $$restProps;
</script>

<Handle
    {id}
    {type}
    {position}
    {style}
    class="{(isColored && type === "target")
        ? '!bg-green-500 '
        : 'bg-ui-2'} h-4 w-4 rounded-full items-center flex"
>
    <div class="pl-5">
        <slot />
    </div>
</Handle>
