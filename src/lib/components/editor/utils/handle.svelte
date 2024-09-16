<script lang="ts">
    import { Handle, Position } from "@xyflow/svelte";
    import type { Writable } from "svelte/store";
    import { getContext, onDestroy } from "svelte";
    import { Voicemail } from "lucide-svelte";

    export let id: string | undefined = undefined;
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

    export let onconnect: () => void = () => {};
    export let ondisconnect: () => void = () => {};

    $$restProps;
</script>

<Handle
    {id}
    {type}
    {position}
    {style}
    onconnect={onconnect}
    ondisconnect={ondisconnect}
    class={isColored
        ? "!bg-green-500 h-3 w-3 rounded-full"
        : "bg-current h-3 w-3 rounded-full"}
>
    <slot />
</Handle>
