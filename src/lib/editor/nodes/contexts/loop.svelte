<script lang="ts">
    import ContextNode from "./context.svelte";
    import type { ContextNodeProps } from "$lib/editor/types/nodes";

    let {
        id,
        type,
        data,
        ...restProps
    }: ContextNodeProps = $props();

    data.start = "0";
    data.end = "";

    data.color = data.color || "rgba(134, 25, 143, 0.3)";
</script>

{#snippet titleContent()}
    <div class="ml-2">
        from
        <input class="w-6 text-center" bind:value={data.start} />
        to
        <input class="w-6 text-center" bind:value={data.end} />
    </div>
{/snippet}

<ContextNode label={id} titleContent={titleContent}/>

