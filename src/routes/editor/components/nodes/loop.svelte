<script lang="ts">
    import ContextNode from "./context.svelte";
    import type { ContextNodeProps } from "$lib/components/types/nodes";

    type $$Props = ContextNodeProps;

    export let id: $$Props["id"];
    export let type: $$Props["type"];
    export let data: $$Props["data"];

    data.start = "0";
    data.end = "";

    data.color = data.color || "rgba(134, 25, 143, 0.3)";

    $$restProps;
</script>

<ContextNode label={id}>
    <div slot="title" class="ml-2">
        from
        <input class="w-6 text-center" bind:value={data.start} />
        to
        <input class="w-6 text-center" bind:value={data.end} />
    </div>
</ContextNode>
