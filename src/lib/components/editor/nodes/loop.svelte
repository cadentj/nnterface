<script lang="ts">
    import ContextNode from "./context.svelte";
    import type { ContextNodeProps } from "$lib/components/types/nodes";

    type $$Props = ContextNodeProps;

    export let id: $$Props["id"];
    export let type: $$Props["type"];
    export let data: $$Props["data"];

    data.color = data.color || "rgba(134, 25, 143, 0.3)";

    $$restProps;
</script>

<ContextNode label={type}>
    <div slot="title">
        <input class="w-6 text-center" bind:value={data.var} />
        from
        <input class="w-6 text-center" bind:value={data.start} />
        to
        <input class="w-6 text-center" bind:value={data.end} />
    </div>
</ContextNode>
