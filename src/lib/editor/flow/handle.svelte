<script lang="ts">
    import { Handle, Position } from "@xyflow/svelte";
    import { connectionHandler } from "@/lib/editor/handlers/states.svelte";

    let {
        id = null,
        position,
        type,
        label,
        style,
        children,
    }: {
        id?: string | null;
        position: Position;
        type: "source" | "target";
        label: string;
        style?: string;
        children?: () => any;
    } = $props();

    const isColored = $derived(connectionHandler.connections?.includes(label));


</script>

<Handle
    {id}
    {type}
    {position}
    {style}
    class="{isColored && type === 'target'
        ? '!bg-green-500 '
        : 'bg-ui-2'} h-4 w-4 rounded-full items-center flex"
>
    <div class="pl-5">
        {@render children?.()}
    </div>
</Handle>
