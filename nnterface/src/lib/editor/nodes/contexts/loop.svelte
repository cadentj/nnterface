<script lang="ts">
    import ContextNode from "./context.svelte";
    import type { ContextNodeProps } from "$lib/editor/types/nodes";

    let {
        id, // Use ID rather than label for uniqueness
        data,
    }: ContextNodeProps = $props();

    let start = $state(data.start);
    let end = $state(data.end);

    $effect(() => {
        data.start = start;
        data.end = end;
    });
</script>

<ContextNode label={id}>
    <div class="ml-2">
        from
        <input class="w-6 text-center" bind:value={start} />
        to
        <input class="w-6 text-center" bind:value={end} />
    </div>
</ContextNode>

