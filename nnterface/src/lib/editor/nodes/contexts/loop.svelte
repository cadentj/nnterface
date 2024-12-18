<script lang="ts">
    import ContextNode from "./context.svelte";
    import type { ContextNodeProps } from "$lib/editor/types/nodes";

    let {
        id, // Use ID rather than label for uniqueness
        data,
    }: ContextNodeProps = $props();
</script>

<ContextNode label={id}>
    <div class="ml-2">
        from
        <input class="w-6 text-center" value={data.start} />
        to
        <input class="w-6 text-center" value={data.end} />
    </div>
</ContextNode>

