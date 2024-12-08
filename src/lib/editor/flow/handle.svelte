<script lang="ts">
    import { Handle, Position, type IsValidConnection } from "@xyflow/svelte";
    import { connectionHandler } from "@/lib/editor/handlers/states.svelte";

    interface HandleProps {
        id?: string | undefined;
        position: Position;
        type: "source" | "target";
        label: string;
        style?: string;
        isValidConnection?: IsValidConnection;
        children?: () => any;
    }

    let {
        id = undefined,
        position,
        type,
        label,
        style,
        isValidConnection,
        children,
    }: HandleProps = $props();

    const classValue = $derived.by(() => {
        let color = "bg-ui-2";

        if (connectionHandler.connections?.includes(label)
            && type === "target"
        ) {
            color = "!bg-green-500";
        }
        return color;
    });
    
    const pointerEvents = $derived.by(() => {
        if (type === "target") {
            return "!pointer-events-none";
        }
    });
</script>

<Handle
    id={id}
    type={type}
    position={position}
    style={style}
    isValidConnection={isValidConnection}
    class="{classValue} {pointerEvents} h-4 w-4 rounded-full items-center flex"
>
    <div class="pl-5">
        {@render children?.()}
    </div>
</Handle>